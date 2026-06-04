import { LinkedTicketRule } from '../src/rules/linkedTicket.js';
import { DEFAULT_CONFIG } from '../src/config.js';

describe('LinkedTicketRule', () => {
  const rule = new LinkedTicketRule();

  it('should pass if ticket is in title', async () => {
    const prData = {
      title: 'feat: PROJ-123 add new feature',
      body: 'Description',
      changedFiles: [],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(true);
    expect(result.score).toBe(DEFAULT_CONFIG.weights.linked_ticket);
  });

  it('should pass if ticket is in body', async () => {
    const prData = {
      title: 'feat: add new feature',
      body: 'Closes #456',
      changedFiles: [],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(true);
  });

  it('should fail if no ticket is found and required', async () => {
    const prData = {
      title: 'feat: add new feature',
      body: 'No ticket here',
      changedFiles: [],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });

  it('should pass if no ticket is found but not required', async () => {
    const prData = {
      title: 'feat: add new feature',
      body: 'No ticket here',
      changedFiles: [],
    };
    const config = { ...DEFAULT_CONFIG, require_linked_ticket: false };
    const result = await rule.run(prData, config);
    expect(result.passed).toBe(true);
    expect(result.score).toBe(0);
  });
});
