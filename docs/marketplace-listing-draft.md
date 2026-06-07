# GitHub Marketplace Listing Draft

## Name
AgentProof PR

## Short Description
Stop reviewing half-finished AI-generated pull requests. Automate PR readiness scoring.

## Long Description
### Automate the "First Pass" of Code Reviews
AgentProof PR is a GitHub Action designed to bridge the gap between AI productivity and human-quality standards. While AI agents are great at writing code, they often forget the context that makes a pull request easy to review.

### Key Features
- **Readiness Scoring:** Get a 0-100 score for every PR based on customizable rules.
- **Placeholder Detection:** Automatically flags `TODO`, `console.log`, and `debugger` statements.
- **Context Verification:** Ensures PRs are linked to tickets and include a clear summary.
- **Evidence Collection:** Requires test logs and evidence before a PR is considered ready.
- **UI Change Detection:** Automatically detects UI changes and requests screenshots.
- **Privacy-First:** Runs entirely within your GitHub Actions environment. No code or metadata ever leaves your servers.

### How it Works
1. Add AgentProof PR to your workflow.
2. (Optional) Customize rules in `.agentproof.yml`.
3. AI agents or human developers open a PR.
4. AgentProof PR provides immediate feedback, helping developers fix "the small things" before requesting a human review.

## Categories
- Code quality
- Continuous integration
- Project management

## Tags
- AI
- Code Review
- Automation
- Productivity

## Support URL Placeholder
https://github.com/mattfred/agentproof-pr/issues

## Privacy & Security Summary
AgentProof PR is a containerized GitHub Action that executes locally within your runner. It does not communicate with any external APIs or servers other than the GitHub API (using the provided `GITHUB_TOKEN`). Your source code and PR metadata remain strictly within your GitHub infrastructure.
