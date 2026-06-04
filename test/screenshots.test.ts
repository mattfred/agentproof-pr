import { ScreenshotsRule } from '../src/rules/screenshots.js';
import { DEFAULT_CONFIG } from '../src/config.js';

describe('ScreenshotsRule', () => {
  const rule = new ScreenshotsRule();

  it('should pass if no UI files changed', async () => {
    const prData = {
      title: 'feat: add feature',
      body: 'Description',
      changedFiles: ['src/logic.ts', 'README.md'],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(true);
    expect(result.message).toContain('No UI changes detected');
  });

  it('should fail if UI files changed but no screenshot in body', async () => {
    const prData = {
      title: 'feat: add feature',
      body: 'I changed the UI but didn\'t add a screenshot.',
      changedFiles: ['src/components/Button.tsx'],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });

  it('should pass if UI files changed and screenshot is present', async () => {
    const prData = {
      title: 'feat: add feature',
      body: 'Look at this! ![UI](https://example.com/image.png)',
      changedFiles: ['src/components/Button.tsx'],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(true);
  });

  it('should pass if UI files changed and video is present', async () => {
      const prData = {
        title: 'feat: add feature',
        body: 'Video evidence: demo.mov',
        changedFiles: ['src/components/Button.tsx'],
      };
      const result = await rule.run(prData, DEFAULT_CONFIG);
      expect(result.passed).toBe(true);
    });
});
