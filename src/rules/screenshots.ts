import { AgentProofConfig } from '../config.js';
import { PRData, Rule, RuleResult } from './index.js';
import { minimatch } from 'minimatch';

export class ScreenshotsRule implements Rule {
  id = 'screenshots';
  name = 'UI Screenshots';

  async run(prData: PRData, config: AgentProofConfig): Promise<RuleResult> {
    const isRequired = config.require_screenshot_for_ui_changes;
    const maxScore = config.weights.screenshots;
    const isBlocking = config.blocking_rules.includes(this.id);

    const uiPaths = config.ui_paths;
    const hasUIChanges = prData.changedFiles.some((file) =>
      uiPaths.some((pattern) => minimatch(file, pattern))
    );

    if (!hasUIChanges) {
      return {
        id: this.id,
        name: this.name,
        passed: true,
        score: maxScore,
        maxScore,
        message: 'No UI changes detected, screenshots not required.',
        isBlocking,
      };
    }

    const body = prData.body || '';
    // GitHub image syntax: ![alt](url) or <img> tag or just a direct link to an image/video
    const hasScreenshot =
      /!\[.*\]\(.*\)/.test(body) ||
      /<img/.test(body) ||
      /\.(png|jpg|jpeg|gif|mov|mp4)/i.test(body);

    if (hasScreenshot) {
      return {
        id: this.id,
        name: this.name,
        passed: true,
        score: maxScore,
        maxScore,
        message: 'Screenshots/videos found for UI changes.',
        isBlocking,
      };
    }

    return {
      id: this.id,
      name: this.name,
      passed: !isRequired,
      score: 0,
      maxScore,
      message: 'UI changes detected but no screenshots/videos found.',
      details: 'Please include screenshots or videos to demonstrate UI changes.',
      isBlocking,
    };
  }
}
