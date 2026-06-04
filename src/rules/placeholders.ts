import { AgentProofConfig } from '../config.js';
import { PRData, Rule, RuleResult } from './index.js';

export class PlaceholdersRule implements Rule {
  id = 'placeholders';
  name = 'No Placeholder/Debug Code';

  async run(prData: PRData, config: AgentProofConfig): Promise<RuleResult> {
    const maxScore = config.weights.placeholders;
    const isBlocking = config.blocking_rules.includes(this.id);

    const patterns = config.placeholder_patterns;
    const diff = prData.diff || '';

    // We only care about added lines in the diff
    const addedLines = diff
      .split('\n')
      .filter((line) => line.startsWith('+') && !line.startsWith('+++'));

    const foundPlaceholders: string[] = [];

    for (const pattern of patterns) {
      const regex = new RegExp(pattern, 'i');
      if (addedLines.some((line) => regex.test(line))) {
        foundPlaceholders.push(pattern);
      }
    }

    if (foundPlaceholders.length === 0) {
      return {
        id: this.id,
        name: this.name,
        passed: true,
        score: maxScore,
        maxScore,
        message: 'No placeholder or debug patterns found in the diff.',
        isBlocking,
      };
    }

    return {
      id: this.id,
      name: this.name,
      passed: false,
      score: 0,
      maxScore,
      message: `Found placeholder or debug patterns: ${foundPlaceholders.join(', ')}`,
      details: 'Please remove TODOs, console.logs, or other placeholders before merging.',
      isBlocking,
    };
  }
}
