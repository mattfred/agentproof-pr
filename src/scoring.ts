import { AgentProofConfig } from './config.js';
import { PRData, Rule, RuleResult } from './rules/index.js';
import { LinkedTicketRule } from './rules/linkedTicket.js';
import { RequiredSectionsRule } from './rules/requiredSections.js';
import { TestEvidenceRule } from './rules/testEvidence.js';
import { ScreenshotsRule } from './rules/screenshots.js';
import { PlaceholdersRule } from './rules/placeholders.js';

export interface ScoringResult {
  score: number;
  totalPossibleScore: number;
  normalizedScore: number;
  ruleResults: RuleResult[];
  passed: boolean;
  blockersFailed: boolean;
}

export async function calculateReadiness(
  prData: PRData,
  config: AgentProofConfig
): Promise<ScoringResult> {
  const rules: Rule[] = [
    new LinkedTicketRule(),
    new RequiredSectionsRule(),
    new TestEvidenceRule(),
    new ScreenshotsRule(),
    new PlaceholdersRule(),
  ];

  const ruleResults: RuleResult[] = [];
  for (const rule of rules) {
    ruleResults.push(await rule.run(prData, config));
  }

  const score = ruleResults.reduce((acc, r) => acc + r.score, 0);
  const totalPossibleScore = ruleResults.reduce((acc, r) => acc + r.maxScore, 0);
  const normalizedScore = totalPossibleScore > 0 ? (score / totalPossibleScore) * 100 : 100;

  const blockersFailed = ruleResults.some((r) => r.isBlocking && !r.passed);
  const scorePassed = normalizedScore >= config.minimum_score;

  let passed = scorePassed;
  if (config.fail_on_blockers && blockersFailed) {
    passed = false;
  }

  return {
    score,
    totalPossibleScore,
    normalizedScore: Math.round(normalizedScore),
    ruleResults,
    passed,
    blockersFailed,
  };
}
