import * as core from '@actions/core';
import { loadConfig } from '../src/config.js';
import { getPRData, commentOnPR } from '../src/github.js';
import { calculateReadiness } from '../src/scoring.js';
import { generateMarkdownSummary } from '../src/report.js';

// We'll test the run function by mocking its dependencies
// and then importing it. We need to use jest.isolateModules to ensure
// that the run() call at the bottom of index.ts doesn't execute immediately
// or we can wrap the run call in index.ts in a way that doesn't execute during tests.
// Actually, index.ts calls run() at the end.

jest.mock('@actions/core');
jest.mock('../src/config.js');
jest.mock('../src/github.js');
jest.mock('../src/scoring.js');
jest.mock('../src/report.js');

describe('index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not comment on PR if comment_on_pr is false', async () => {
    (core.getInput as jest.Mock).mockReturnValue('token');
    (core.getBooleanInput as jest.Mock).mockReturnValue(false);
    (loadConfig as jest.Mock).mockReturnValue({});
    (getPRData as jest.Mock).mockResolvedValue({});
    (calculateReadiness as jest.Mock).mockResolvedValue({
      passed: true,
      normalizedScore: 100,
    });
    (generateMarkdownSummary as jest.Mock).mockReturnValue('summary');
    (core.summary.addRaw as jest.Mock).mockReturnThis();
    (core.summary.write as jest.Mock).mockResolvedValue({});

    // Import index.ts to trigger the run() function
    // Since index.ts calls run() immediately, we need to be careful.
    // In a real scenario, we might want to export run and not call it in the file if we want to test it easily.
    // But here we'll just re-import it.
    await import('../src/index.js');

    expect(commentOnPR).not.toHaveBeenCalled();
  });
});
