import { AgentProofConfig } from '../config.js';
import { PRData, Rule, RuleResult } from './index.js';

export class RequiredSectionsRule implements Rule {
  id = 'required_sections';
  name = 'Required Sections';

  async run(prData: PRData, config: AgentProofConfig): Promise<RuleResult> {
    const sections = [
      {
        id: 'summary',
        name: 'Summary',
        required: config.require_summary,
        weight: config.weights.summary,
        patterns: [/summary/i, /description/i, /what does this pr do/i],
      },
      {
        id: 'acceptance_criteria',
        name: 'Acceptance Criteria',
        required: config.require_acceptance_criteria,
        weight: config.weights.acceptance_criteria,
        patterns: [/acceptance criteria/i, /how to test/i, /requirements/i],
      },
      {
        id: 'risk',
        name: 'Risk Notes',
        required: config.require_risk,
        weight: config.weights.risk,
        patterns: [/risk/i, /impact/i, /danger/i],
      },
      {
        id: 'rollback',
        name: 'Rollback Notes',
        required: config.require_rollback,
        weight: config.weights.rollback,
        patterns: [/rollback/i, /revert/i, /backup plan/i],
      },
    ];

    let totalScore = 0;
    let maxScore = 0;
    const missingRequired: string[] = [];
    const foundSections: string[] = [];

    const body = prData.body || '';

    for (const section of sections) {
      maxScore += section.weight;
      const isFound = section.patterns.some((p) => p.test(body));

      if (isFound) {
        totalScore += section.weight;
        foundSections.push(section.name);
      } else if (section.required) {
        missingRequired.push(section.name);
      }
    }

    const passed = missingRequired.length === 0;
    const isBlocking = config.blocking_rules.includes(this.id);

    return {
      id: this.id,
      name: this.name,
      passed,
      score: totalScore,
      maxScore,
      message: passed
        ? 'All required sections are present.'
        : `Missing required sections: ${missingRequired.join(', ')}`,
      details: `Found sections: ${foundSections.length > 0 ? foundSections.join(', ') : 'None'}.`,
      isBlocking,
    };
  }
}
