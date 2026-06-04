import { AgentProofConfig } from '../config.js';
import { PRData, Rule, RuleResult } from './index.js';

export class TestEvidenceRule implements Rule {
  id = 'test_evidence';
  name = 'Test Evidence';

  async run(prData: PRData, config: AgentProofConfig): Promise<RuleResult> {
    const isRequired = config.require_test_evidence;
    const maxScore = config.weights.test_evidence;
    const isBlocking = config.blocking_rules.includes(this.id);

    const testKeywords = [
      /test evidence/i,
      /test results/i,
      /how I tested/i,
      /unit tests/i,
      /integration tests/i,
      /e2e tests/i,
      /manual tests/i,
      /successfully tested/i,
    ];

    const body = prData.body || '';
    const hasEvidence = testKeywords.some((pattern) => pattern.test(body));

    if (hasEvidence) {
      return {
        id: this.id,
        name: this.name,
        passed: true,
        score: maxScore,
        maxScore,
        message: 'Test evidence found in PR description.',
        isBlocking,
      };
    }

    return {
      id: this.id,
      name: this.name,
      passed: !isRequired,
      score: 0,
      maxScore,
      message: 'No test evidence found in PR description.',
      details: 'Please provide evidence of testing (logs, test results, manual test steps).',
      isBlocking,
    };
  }
}
