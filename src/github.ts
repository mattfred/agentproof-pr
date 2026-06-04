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
