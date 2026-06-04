import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as core from '@actions/core';

export interface AgentProofConfig {
  minimum_score: number;
  fail_on_blockers: boolean;

  require_linked_ticket: boolean;
  require_summary: boolean;
  require_acceptance_criteria: boolean;
  require_test_evidence: boolean;
  require_risk: boolean;
  require_rollback: boolean;
  require_screenshot_for_ui_changes: boolean;

  ticket_patterns: string[];
  ui_paths: string[];
  placeholder_patterns: string[];

  weights: {
    linked_ticket: number;
    summary: number;
    acceptance_criteria: number;
    test_evidence: number;
    risk: number;
    rollback: number;
    screenshots: number;
    placeholders: number;
  };

  blocking_rules: string[];
}

export const DEFAULT_CONFIG: AgentProofConfig = {
  minimum_score: 80,
  fail_on_blockers: true,

  require_linked_ticket: true,
  require_summary: true,
  require_acceptance_criteria: true,
  require_test_evidence: true,
  require_risk: true,
  require_rollback: true,
  require_screenshot_for_ui_changes: true,

  ticket_patterns: ['[A-Z]+-[0-9]+', '#[0-9]+'],
  ui_paths: [
    'lib/**',
    'app/**',
    'src/**/*.tsx',
    'src/**/*.jsx',
    'src/**/*.dart',
    'android/**',
    'ios/**',
  ],
  placeholder_patterns: [
    'TODO',
    'FIXME',
    'temporary',
    'hack',
    'stub',
    'not implemented',
    'lorem ipsum',
    'console.log',
    'debugger',
  ],

  weights: {
    linked_ticket: 10,
    summary: 10,
    acceptance_criteria: 20,
    test_evidence: 20,
    risk: 10,
    rollback: 10,
    screenshots: 10,
    placeholders: 10,
  },

  blocking_rules: [],
};

export function loadConfig(configPath: string): AgentProofConfig {
  let config: Partial<AgentProofConfig> = {};

  if (fs.existsSync(configPath)) {
    try {
      const fileContents = fs.readFileSync(configPath, 'utf8');
      config = yaml.load(fileContents) as Partial<AgentProofConfig>;
      core.info(`Loaded config from ${configPath}`);
    } catch (error) {
      core.warning(`Failed to load config from ${configPath}, using defaults. Error: ${error}`);
    }
  } else {
    core.info(`Config file not found at ${configPath}, using defaults.`);
  }

  return {
    ...DEFAULT_CONFIG,
    ...config,
    weights: {
      ...DEFAULT_CONFIG.weights,
      ...(config.weights || {}),
    },
  };
}
