import { RequiredSectionsRule } from '../src/rules/requiredSections.js';
import { DEFAULT_CONFIG } from '../src/config.js';

describe('RequiredSectionsRule', () => {
  const rule = new RequiredSectionsRule();

  it('should pass if all required sections are present', async () => {
    const prData = {
      title: 'feat: add feature',
      body: `
## Summary
This is a summary.
## Acceptance Criteria
- It works
## Risk
Low
## Rollback
Just revert
`,
      changedFiles: [],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(true);
    expect(result.score).toBe(result.maxScore);
  });

  it('should fail if a required section is missing', async () => {
    const prData = {
      title: 'feat: add feature',
      body: `
## Summary
This is a summary.
`,
      changedFiles: [],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(false);
    expect(result.score).toBeLessThan(result.maxScore);
    expect(result.message).toContain('Missing required sections');
    expect(result.message).toContain('Acceptance Criteria');
    expect(result.message).toContain('Risk Notes');
    expect(result.message).toContain('Rollback Notes');
  });

  it('should pass if sections are missing but not required', async () => {
    const prData = {
      title: 'feat: add feature',
      body: `## Summary\nThis is a summary.`,
      changedFiles: [],
    };
    const config = {
      ...DEFAULT_CONFIG,
      require_acceptance_criteria: false,
      require_risk: false,
      require_rollback: false,
    };
    const result = await rule.run(prData, config);
    expect(result.passed).toBe(true);
  });
});
