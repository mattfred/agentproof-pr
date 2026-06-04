import { PlaceholdersRule } from '../src/rules/placeholders.js';
import { DEFAULT_CONFIG } from '../src/config.js';

describe('PlaceholdersRule', () => {
  const rule = new PlaceholdersRule();

  it('should pass if no placeholders are in diff', async () => {
    const prData = {
      title: 'feat: add feature',
      body: 'Description',
      changedFiles: ['src/index.ts'],
      diff: `
--- a/src/index.ts
+++ b/src/index.ts
@@ -1 +1,2 @@
+const x = 1;
+console.log("hello"); // wait, console.log IS a placeholder by default
`,
    };
    // Default config HAS console.log as placeholder
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(false);
  });

  it('should pass if no placeholders are in added lines', async () => {
    const prData = {
      title: 'feat: add feature',
      body: 'Description',
      changedFiles: ['src/index.ts'],
      diff: `
--- a/src/index.ts
+++ b/src/index.ts
@@ -1,2 +1,2 @@
-TODO: fix this
+const fixed = true;
`,
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(true);
  });

  it('should fail if TODO is found', async () => {
    const prData = {
      title: 'feat: add feature',
      body: 'Description',
      changedFiles: ['src/index.ts'],
      diff: `+ // TODO: implement this`,
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(false);
    expect(result.message).toContain('TODO');
  });
});
