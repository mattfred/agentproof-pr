# Product Roadmap

This roadmap outlines the planned development for AgentProof PR. Note that these are subject to change based on alpha feedback.

## Phase 1: Alpha Readiness (Current)
- [x] Core scoring logic.
- [x] Basic set of 8 rules.
- [x] GitHub Action integration.
- [x] Initial documentation and examples.
- [x] Private alpha release.

## Phase 2: Refinement & Expansion
- [ ] **Semantic Analysis**: Use lightweight LLM checks to verify the *content* of the summary and acceptance criteria (not just presence).
- [ ] **Agent Integrations**: First-class support for popular agents like Aider, Roo Code, and GitHub Copilot Workspace.
- [ ] **Custom Rules**: Allow users to define their own rules using regex or simple scripts.
- [ ] **Auto-Remediation**: Allow the action to commit simple fixes back to the PR (e.g., adding missing headers).

## Phase 3: Ecosystem & Scale
- [ ] **Marketplace Release**: Official release on the GitHub Marketplace.
- [ ] **Reporting Dashboard**: A centralized view for teams to see PR readiness trends across repositories.
- [ ] **Slack/Discord Notifications**: Send readiness reports to team communication channels.

## Future Ideas
- [ ] Integration with Jira/Linear for automatic status updates.
- [ ] Support for other CI/CD platforms (GitLab, Bitbucket).
- [ ] advanced risk assessment using code complexity metrics.
