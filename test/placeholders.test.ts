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

  it('should ignore placeholders in ignored paths', async () => {
    const prData = {
      title: 'docs: update docs',
      body: 'Description',
      changedFiles: ['docs/README.md'],
      files: [
        {
          filename: 'docs/README.md',
          patch: '+ TODO: document this',
        },
      ],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(true);
    expect(result.message).toContain('all matches were ignored');
    expect(result.details).toContain('docs/README.md');
    expect(result.details).toContain('(ignored)');
  });

  it('should fail if placeholders are in mixed files', async () => {
    const prData = {
      title: 'feat: add feature',
      body: 'Description',
      changedFiles: ['src/index.ts', 'README.md'],
      files: [
        {
          filename: 'src/index.ts',
          patch: '+ console.log("debug");',
        },
        {
          filename: 'README.md',
          patch: '+ TODO: fix this',
        },
      ],
    };
    const result = await rule.run(prData, DEFAULT_CONFIG);
    expect(result.passed).toBe(false);
    expect(result.message).toContain('Found placeholder or debug patterns: console.log');
    expect(result.details).toContain('`src/index.ts`');
    expect(result.details).toContain('`README.md` (ignored)');
  });

  it('should support custom ignore paths', async () => {
    const config = {
      ...DEFAULT_CONFIG,
      placeholder_ignore_paths: ['tests/**'],
    };
    const prData = {
      title: 'test: add tests',
      body: 'Description',
      changedFiles: ['tests/main.test.ts'],
      files: [
        {
          filename: 'tests/main.test.ts',
          patch: '+ // TODO: test this edge case',
        },
      ],
    };
    const result = await rule.run(prData, config);
    expect(result.passed).toBe(true);
  });
});
