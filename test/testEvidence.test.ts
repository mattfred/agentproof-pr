import { TestEvidenceRule } from '../src/rules/testEvidence.js';
import { DEFAULT_CONFIG } from '../src/config.js';

describe('TestEvidenceRule', () => {
  const rule = new TestEvidenceRule();

  it('should pass if test evidence is present', async () => {
    const prData = {
      title: 'feat: add feature',
      body: '## Test Evidence\nAll tests passed locally.',
      changedFiles: [],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(true);
    expect(result.score).toBe(result.maxScore);
  });

  it('should recognize various test keywords', async () => {
    const keywords = [
      'how I tested',
      'Unit tests',
      'Integration Tests',
      'Manual tests',
      'Successfully tested'
    ];

    for (const keyword of keywords) {
      const prData = {
        title: 'feat: add feature',
        body: `Some content. ${keyword}: logic verified.`,
        changedFiles: [],
      };
      const result = await rule.run(prData, DEFAULT_CONFIG);
      expect(result.passed).toBe(true);
    }
  });

  it('should fail if test evidence is missing and required', async () => {
    const prData = {
      title: 'feat: add feature',
      body: 'No mention of testing here.',
      changedFiles: [],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });

  it('should pass if missing but not required', async () => {
    const prData = {
      title: 'feat: add feature',
      body: 'No mention of testing here.',
      changedFiles: [],
    };
    const config = {
      ...DEFAULT_CONFIG,
      require_test_evidence: false,
    };
    const result = await rule.run(prData, config);
    expect(result.passed).toBe(true);
    expect(result.score).toBe(0);
  });
});
