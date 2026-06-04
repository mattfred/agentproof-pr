import { AgentProofConfig } from '../config.js';
import { PRData, Rule, RuleResult } from './index.js';

export class LinkedTicketRule implements Rule {
  id = 'linked_ticket';
  name = 'Linked Ticket';

  async run(prData: PRData, config: AgentProofConfig): Promise<RuleResult> {
    const isRequired = config.require_linked_ticket;
    const maxScore = config.weights.linked_ticket;
    const isBlocking = config.blocking_rules.includes(this.id);

    const patterns = config.ticket_patterns.map((p) => new RegExp(p));
    const content = `${prData.title}\n${prData.body}`;

    const hasMatch = patterns.some((pattern) => pattern.test(content));

    if (hasMatch) {
      return {
        id: this.id,
        name: this.name,
        passed: true,
        score: maxScore,
        maxScore,
        message: 'Linked ticket found in PR title or description.',
        isBlocking,
      };
    }

    return {
      id: this.id,
      name: this.name,
      passed: !isRequired,
      score: 0,
      maxScore,
      message: 'No linked ticket found in PR title or description.',
      details: 'Please include a ticket reference like JIRA-123 or #123.',
      isBlocking,
    };
  }
}
