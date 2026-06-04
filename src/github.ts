import * as github from '@actions/github';
import * as core from '@actions/core';
import { PRData } from './rules/index.js';

export async function getPRData(token: string): Promise<PRData> {
  const octokit = github.getOctokit(token);
  const context = github.context;

  if (context.payload.pull_request == null) {
    throw new Error('This action only runs on pull_request events.');
  }

  const prNumber = context.payload.pull_request.number;
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  core.info(`Fetching data for PR #${prNumber} in ${owner}/${repo}`);

  const { data: pr } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
  });

  const { data: files } = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: prNumber,
    per_page: 100, // Handle up to 100 files for MVP
  });

  // Fetch diff
  const { data: diff } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
    mediaType: {
      format: 'diff',
    },
  });

  return {
    title: pr.title,
    body: pr.body || '',
    changedFiles: files.map((f) => f.filename),
    diff: diff as unknown as string,
  };
}

export async function commentOnPR(token: string, body: string): Promise<void> {
  const octokit = github.getOctokit(token);
  const context = github.context;
  const prNumber = context.payload.pull_request?.number;
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  if (!prNumber) {
    core.warning('Not a pull request, skipping comment.');
    return;
  }

  const marker = '<!-- agentproof-pr-comment -->';

  try {
    const { data: comments } = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number: prNumber,
    });

    const existingComment = comments.find((c) => c.body?.includes(marker));

    if (existingComment) {
      core.info(`Updating existing PR comment ${existingComment.id}`);
      await octokit.rest.issues.updateComment({
        owner,
        repo,
        comment_id: existingComment.id,
        body,
      });
    } else {
      core.info('Creating new PR comment');
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      core.warning(`Failed to comment on PR: ${error.message}`);
      core.info('This might be due to insufficient permissions (e.g., from a forked PR).');
    } else {
      core.warning('An unknown error occurred while commenting on the PR.');
    }
  }
}
