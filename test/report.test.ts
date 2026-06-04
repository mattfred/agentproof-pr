import { generateMarkdownSummary, generatePRComment } from '../src/report.js';
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

  describe('generatePRComment', () => {
    it('should generate a PR comment matching the required format', () => {
      const result: ScoringResult = {
        passed: false,
        score: 72,
        totalPossibleScore: 100,
        normalizedScore: 72,
        ruleResults: [
          {
            id: 'test_evidence',
            name: 'Test Evidence',
            passed: false,
            score: 0,
            maxScore: 20,
            message: 'Missing test evidence.',
            details: 'Add exact test commands and results.',
            isBlocking: true
          },
          {
            id: 'screenshots',
            name: 'Screenshots',
            passed: false,
            score: 0,
            maxScore: 10,
            message: 'UI files changed but no screenshot evidence was found.',
            details: 'Attach screenshots or links for UI changes.',
            isBlocking: true
          },
          {
            id: 'risk',
            name: 'Risk',
            passed: false,
            score: 5,
            maxScore: 10,
            message: 'Risk notes are present but very short.',
            isBlocking: false
          },
          {
            id: 'linked_ticket',
            name: 'Linked Ticket',
            passed: true,
            score: 10,
            maxScore: 10,
            message: 'Linked ticket found.',
            isBlocking: false
          }
        ],
        blockersFailed: true
      };

      const comment = generatePRComment(result);
      expect(comment).toContain('# AgentProof PR Readiness');
      expect(comment).toContain('**Status:** Not Ready');
      expect(comment).toContain('**Score:** 72/100');
      expect(comment).toContain('## Blocking Issues');
      expect(comment).toContain('* Missing test evidence.');
      expect(comment).toContain('* UI files changed but no screenshot evidence was found.');
      expect(comment).toContain('## Warnings');
      expect(comment).toContain('* Risk notes are present but very short.');
      expect(comment).toContain('## Passed Checks');
      expect(comment).toContain('* Linked ticket found.');
      expect(comment).toContain('## Suggested Fixes');
      expect(comment).toContain('* Add exact test commands and results.');
      expect(comment).toContain('* Attach screenshots or links for UI changes.');
      expect(comment).toContain('<!-- agentproof-pr-comment -->');
    });

    it('should handle all checks passed', () => {
      const result: ScoringResult = {
        passed: true,
        score: 100,
        totalPossibleScore: 100,
        normalizedScore: 100,
        ruleResults: [
          {
            id: 'test',
            name: 'Test',
            passed: true,
            score: 10,
            maxScore: 10,
            message: 'Test passed.',
            isBlocking: true
          }
        ],
        blockersFailed: false
      };

      const comment = generatePRComment(result);
      expect(comment).toContain('**Status:** Ready');
      expect(comment).toContain('**Score:** 100/100');
      expect(comment).not.toContain('## Blocking Issues');
      expect(comment).not.toContain('## Warnings');
      expect(comment).toContain('## Passed Checks');
      expect(comment).toContain('* Test passed.');
      expect(comment).not.toContain('## Suggested Fixes');
    });
  });
});
