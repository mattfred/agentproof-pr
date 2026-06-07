import { loadConfig, DEFAULT_CONFIG } from '../src/config.js';
import * as fs from 'fs';

import * as core from '@actions/core';

jest.mock('fs');
jest.mock('@actions/core', () => ({
  info: jest.fn(),
  warning: jest.fn(),
}));

describe('config', () => {
  it('should return default config if file does not exist and log checkout guidance', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const config = loadConfig('.agentproof.yml');
    expect(config).toEqual(DEFAULT_CONFIG);
    expect(core.info).toHaveBeenCalledWith(
      expect.stringContaining('make sure your workflow runs actions/checkout before AgentProof')
    );
  });

  it('should override defaults with values from file', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    const mockYaml = `
minimum_score: 90
require_summary: false
weights:
  test_evidence: 50
`;
    (fs.readFileSync as jest.Mock).mockReturnValue(mockYaml);

    const config = loadConfig('.agentproof.yml');
    expect(config.minimum_score).toBe(90);
    expect(config.require_summary).toBe(false);
    expect(config.require_linked_ticket).toBe(true); // default
    expect(config.weights.test_evidence).toBe(50);
    expect(config.weights.linked_ticket).toBe(10); // default
  });
});
