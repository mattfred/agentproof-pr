import { AgentProofConfig } from '../config.js';

export interface RuleResult {
  id: string;
  name: string;
  passed: boolean;
  score: number;
  maxScore: number;
  message: string;
  details?: string;
  isBlocking: boolean;
}

export interface PRData {
  title: string;
  body: string;
  changedFiles: string[];
  diff?: string;
}

export interface Rule {
  id: string;
  name: string;
  run(prData: PRData, config: AgentProofConfig): Promise<RuleResult>;
}
