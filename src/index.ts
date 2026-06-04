import * as core from '@actions/core';
import { loadConfig } from './config.js';
import { getPRData, commentOnPR } from './github.js';
import { calculateReadiness } from './scoring.js';
import { generateMarkdownSummary, generatePRComment } from './report.js';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', { required: true });
    const configPath = core.getInput('config-path') || '.agentproof.yml';
    const commentOnPrEnabled = core.getBooleanInput('comment_on_pr');

    const config = loadConfig(configPath);
    const prData = await getPRData(token);

    const result = await calculateReadiness(prData, config);

    // Set outputs
    core.setOutput('readiness_score', result.normalizedScore.toString());
    core.setOutput('readiness_status', result.passed ? 'passed' : 'failed');
    core.setOutput('readiness_report_json', JSON.stringify(result, null, 2));

    // Generate summary
    const summary = generateMarkdownSummary(result);
    await core.summary.addRaw(summary).write();

    // Comment on PR
    if (commentOnPrEnabled) {
      const prComment = generatePRComment(result);
      await commentOnPR(token, prComment);
    }

    if (!result.passed) {
      if (result.blockersFailed) {
        core.setFailed('AgentProof PR failed: One or more blocking rules failed.');
      } else {
        core.setFailed(
          `AgentProof PR failed: Readiness score ${result.normalizedScore} is below minimum ${config.minimum_score}.`
        );
      }
    } else {
      core.info(`AgentProof PR passed with score ${result.normalizedScore}.`);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('An unknown error occurred.');
    }
  }
}

run();
