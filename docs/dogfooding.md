# Dogfooding AgentProof PR

This repository uses its own action, AgentProof PR, to validate all pull requests.

## Why we dogfood

1.  **Quality Assurance**: By using our own tool, we ensure that every change to this repository meets the same high standards we recommend to our users.
2.  **Early Detection**: We can catch bugs or usability issues in the action itself before they affect our users.
3.  **Real-world Testing**: It provides a continuous, real-world test environment for the action's logic and configuration.

## How the Readiness Score works

The readiness score (0-100) is calculated based on the presence and quality of several key components in a pull request:

*   **Linked Tickets**: Ensures every PR is tied to an issue or task.
*   **Summary**: A clear explanation of what changed and why.
*   **Acceptance Criteria**: Verification that all requirements are met.
*   **Test Evidence**: Proof that the changes were tested (e.g., test output, logs).
*   **Risk & Rollback**: Considerations for what could go wrong and how to fix it.
*   **Placeholders**: Checks for "TODO"s or "console.log"s that shouldn't be in production code.

Each rule has a weight, and the final score is the weighted average of passing rules.

## Requirements for Contributors

To ensure your PR passes the AgentProof check, please use the provided [Pull Request Template](../.github/pull_request_template.md) and include:

1.  **A linked ticket**: Reference an issue using `#123` or `PROJECT-123` in the PR body.
2.  **A detailed summary**: Explain the "what" and "why".
3.  **Acceptance Criteria**: List the items you've completed.
4.  **Test Evidence**: Paste your test results or describe how you verified the change.
5.  **Risk Assessment**: Note any potential side effects.
6.  **Rollback Plan**: Explain how to revert the change if it causes issues.

If your PR does not meet the minimum score (defined in `.agentproof.yml`), the check will fail, and you will need to update the PR description.
