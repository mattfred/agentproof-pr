import { calculateReadiness } from '../src/scoring.js';
import { DEFAULT_CONFIG } from '../src/config.js';

describe('scoring', () => {
  it('should calculate perfect score for complete PR', async () => {
    const prData = {
      title: 'feat: PROJ-123 add feature',
      body: `
## Summary
Great feature.
## Acceptance Criteria
Tested and works.
## Risk
None.
## Rollback
Easy.
## Test Evidence
Logs attached.
`,
      changedFiles: ['README.md'],
      diff: '+ const x = 1;',
    };
    const result = await calculateReadiness(prData, DEFAULT_CONFIG);
    expect(result.normalizedScore).toBe(100);
    expect(result.passed).toBe(true);
  });

  it('should fail if score is below minimum', async () => {
    const prData = {
      title: 'feat: no ticket',
      body: 'No sections either.',
      changedFiles: ['README.md'],
      diff: '+ const x = 1;',
    };
    const result = await calculateReadiness(prData, DEFAULT_CONFIG);
    expect(result.normalizedScore).toBeLessThan(DEFAULT_CONFIG.minimum_score);
    expect(result.passed).toBe(false);
  });

  it('should fail if blocker fails even if score is high', async () => {
    const prData = {
        title: 'feat: no ticket', // blocker
        body: `
## Summary
Great feature.
## Acceptance Criteria
Tested and works.
## Risk
None.
## Rollback
Easy.
## Test Evidence
Logs attached.
`,
        changedFiles: ['README.md'],
        diff: '+ const x = 1;',
      };
      const config = {
        ...DEFAULT_CONFIG,
        blocking_rules: ['linked_ticket'],
        minimum_score: 50
      };
      const result = await calculateReadiness(prData, config);
      expect(result.normalizedScore).toBeGreaterThan(50);
      expect(result.passed).toBe(false);
      expect(result.blockersFailed).toBe(true);
  });
});
