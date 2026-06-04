import { generateMarkdownSummary } from '../src/report.js';
import { ScoringResult } from '../src/scoring.js';

describe('report generation', () => {
  it('should generate a passing summary', () => {
    const result: ScoringResult = {
      passed: true,
      score: 100,
      totalPossibleScore: 100,
      normalizedScore: 100,
      ruleResults: [
        {
          id: 'test',
          name: 'Test Rule',
          passed: true,
          score: 10,
          maxScore: 10,
          message: 'Passed',
          isBlocking: false
        }
      ],
      blockersFailed: false
    };

    const summary = generateMarkdownSummary(result);
    expect(summary).toContain('### AgentProof PR Readiness Report');
    expect(summary).toContain('✅ PASSED');
    expect(summary).toContain('100/100');
    expect(summary).toContain('| Test Rule | ✅ | 10/10 | Passed |');
  });

  it('should generate a failing summary with blockers', () => {
    const result: ScoringResult = {
      passed: false,
      score: 50,
      totalPossibleScore: 100,
      normalizedScore: 50,
      ruleResults: [
        {
          id: 'blocker',
          name: 'Blocking Rule',
          passed: false,
          score: 0,
          maxScore: 10,
          message: 'Failed',
          isBlocking: true
        }
      ],
      blockersFailed: true
    };

    const summary = generateMarkdownSummary(result);
    expect(summary).toContain('❌ FAILED');
    expect(summary).toContain('50/100');
    expect(summary).toContain('One or more blocking rules failed');
    expect(summary).toContain('| Blocking Rule | ❌ | 0/10 | Failed |');
  });

  it('should show warning icon for non-blocking failures', () => {
    const result: ScoringResult = {
      passed: true,
      score: 90,
      totalPossibleScore: 100,
      normalizedScore: 90,
      ruleResults: [
        {
          id: 'warn',
          name: 'Warning Rule',
          passed: false,
          score: 0,
          maxScore: 10,
          message: 'Missing',
          isBlocking: false
        }
      ],
      blockersFailed: false
    };

    const summary = generateMarkdownSummary(result);
    expect(summary).toContain('| Warning Rule | ⚠️ | 0/10 | Missing |');
  });
});
