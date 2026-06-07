import * as fs from 'fs';
import * as path from 'path';

describe('workflow examples', () => {
  const readmePath = path.join(__dirname, '../README.md');
  const gettingStartedPath = path.join(__dirname, '../docs/getting-started.md');
  const releasingPath = path.join(__dirname, '../docs/releasing.md');

  const checkFileForCheckout = (filePath: string) => {
    const content = fs.readFileSync(filePath, 'utf8');
    // Find all yaml code blocks that mention agentproof-pr
    const blocks = content.match(/```yaml[\s\S]*?mattfred\/agentproof-pr[\s\S]*?```/g) || [];
    
    blocks.forEach(block => {
      expect(block).toContain('actions/checkout@v4');
    });
  };

  it('README.md should include actions/checkout in examples', () => {
    checkFileForCheckout(readmePath);
  });

  it('getting-started.md should include actions/checkout in examples', () => {
    checkFileForCheckout(gettingStartedPath);
  });

  it('releasing.md should include actions/checkout in examples', () => {
    checkFileForCheckout(releasingPath);
  });
});
