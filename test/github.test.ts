import { commentOnPR } from '../src/github.js';
import * as github from '@actions/github';
import * as core from '@actions/core';

jest.mock('@actions/github', () => ({
  getOctokit: jest.fn(),
  context: {
    payload: {
      pull_request: {
        number: 123,
      },
    },
    repo: {
      owner: 'owner',
      repo: 'repo',
    },
  },
}));

jest.mock('@actions/core', () => ({
  info: jest.fn(),
  warning: jest.fn(),
}));

describe('github', () => {
  const mockOctokit = {
    rest: {
      issues: {
        listComments: jest.fn(),
        createComment: jest.fn(),
        updateComment: jest.fn(),
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (github.getOctokit as jest.Mock).mockReturnValue(mockOctokit);
  });

  describe('commentOnPR', () => {
    it('should create a new comment if none exists', async () => {
      (mockOctokit.rest.issues.listComments as jest.Mock).mockResolvedValue({ data: [] });

      await commentOnPR('token', 'body');

      expect(mockOctokit.rest.issues.createComment).toHaveBeenCalledWith({
        owner: 'owner',
        repo: 'repo',
        issue_number: 123,
        body: 'body',
      });
    });

    it('should update an existing comment if it has the marker', async () => {
      (mockOctokit.rest.issues.listComments as jest.Mock).mockResolvedValue({
        data: [
          { id: 456, body: 'some other comment' },
          { id: 789, body: 'existing comment <!-- agentproof-pr-comment -->' },
        ],
      });

      await commentOnPR('token', 'new body');

      expect(mockOctokit.rest.issues.updateComment).toHaveBeenCalledWith({
        owner: 'owner',
        repo: 'repo',
        comment_id: 789,
        body: 'new body',
      });
    });

    it('should handle permission failures gracefully', async () => {
      (mockOctokit.rest.issues.listComments as jest.Mock).mockRejectedValue(new Error('Resource not accessible by integration'));

      await commentOnPR('token', 'body');

      expect(core.warning).toHaveBeenCalledWith(expect.stringContaining('Failed to comment on PR'));
    });
  });
});
