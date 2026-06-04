import { AgentProofConfig } from '../config.js';
import { PRData, Rule, RuleResult } from './index.js';
import { minimatch } from 'minimatch';

export class PlaceholdersRule implements Rule {
  id = 'placeholders';
  name = 'No Placeholder/Debug Code';

  async run(prData: PRData, config: AgentProofConfig): Promise<RuleResult> {
    const maxScore = config.weights.placeholders;
    const isBlocking = config.blocking_rules.includes(this.id);

    const patterns = config.placeholder_patterns;
    const ignorePaths = config.placeholder_ignore_paths || [];

    const results: { pattern: string; file: string; ignored: boolean }[] = [];

    // Use prData.files if available, otherwise fallback to parsing prData.diff
    const fileEntries: { filename: string; patch: string }[] = [];

    if (prData.files && prData.files.length > 0) {
      for (const f of prData.files) {
        if (f.patch) {
          fileEntries.push({ filename: f.filename, patch: f.patch });
        }
      }
    } else if (prData.diff) {
      // Very basic diff parsing for backward compatibility (e.g. in tests)
      if (prData.diff.includes('diff --git')) {
        const parts = prData.diff.split(/^diff --git /m);
        for (const part of parts) {
          if (!part.trim()) continue;
          const lines = part.split('\n');
          const fileMatch = lines[0].match(/a\/(.*) b\//);
          const filename = fileMatch ? fileMatch[1] : 'unknown';
          fileEntries.push({ filename, patch: part });
        }
      } else {
        // Just a raw snippet (like in some tests)
        fileEntries.push({ filename: 'unknown', patch: prData.diff });
      }
    }

    for (const entry of fileEntries) {
      const isIgnored = ignorePaths.some((pattern) =>
        minimatch(entry.filename, pattern)
      );

      const addedLines = entry.patch
        .split('\n')
        .filter((line) => line.startsWith('+') && !line.startsWith('+++'));

      for (const pattern of patterns) {
        const regex = new RegExp(pattern, 'i');
        if (addedLines.some((line) => regex.test(line))) {
          results.push({
            pattern,
            file: entry.filename,
            ignored: isIgnored,
          });
        }
      }
    }

    const nonIgnored = results.filter((r) => !r.ignored);

    if (results.length === 0) {
      return {
        id: this.id,
        name: this.name,
        passed: true,
        score: maxScore,
        maxScore,
        message: 'No placeholder or debug patterns found in the diff.',
        isBlocking,
      };
    }

    const reportLines = results.map(
      (r) => `- \`${r.pattern}\` in \`${r.file}\`${r.ignored ? ' (ignored)' : ''}`
    );

    const uniquePatterns = [
      ...new Set(nonIgnored.map((r) => r.pattern)),
    ].join(', ');

    const message =
      nonIgnored.length === 0
        ? 'No active placeholder or debug patterns found (all matches were ignored).'
        : `Found placeholder or debug patterns: ${uniquePatterns}`;

    return {
      id: this.id,
      name: this.name,
      passed: nonIgnored.length === 0,
      score: nonIgnored.length === 0 ? maxScore : 0,
      maxScore,
      message,
      details: `Identified patterns:\n\n${reportLines.join(
        '\n'
      )}\n\nPlease remove any placeholders or debug code before merging.`,
      isBlocking,
    };
  }
}
