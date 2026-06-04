# Getting Started with AgentProof PR

Welcome to AgentProof PR! This guide will help you get up and running in under 5 minutes.

## 1. Add the GitHub Action

Create a new file in your repository at `.github/workflows/agentproof.yml`:

```yaml
name: AgentProof PR
on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  check:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      issues: write
    steps:
      - uses: actions/checkout@v4
      - uses: mattfred/agentproof-pr@v0.1.0
        with:
          token: ${{ github.token }}
          comment_on_pr: true
```

## 2. (Optional) Customize Configuration

By default, AgentProof PR works out of the box with sensible defaults. To customize it, create a `.agentproof.yml` file in your repository root:

```yaml
minimum_score: 85
fail_on_blockers: true
blocking_rules:
  - linked_ticket
```

## 3. Open a Pull Request

Once you've added the workflow, open a new pull request. AgentProof PR will automatically trigger, analyze your PR, and post a readiness report as a comment.

## 4. Iterate

If the report identifies issues (e.g., missing test evidence or debug logs), address them and push your changes. AgentProof PR will re-run and update the report.

## Next Steps

- Explore [Configuration](configuration.md) to fine-tune your rules.
- Learn about the [Rules](rules.md) and how they are scored.
- Check out the [Examples](../examples) for language-specific setups.
