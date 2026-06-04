# AgentProof PR

A GitHub Action that checks whether a pull request is ready for human review, especially when the PR was created by an AI coding agent.

AgentProof PR scores pull requests for linked tickets, acceptance criteria coverage, test evidence, CI status, screenshots if UI changes, placeholders, clean summary, and risk/rollback notes.

## Dogfooding

This project dogfoods AgentProof PR to ensure its own pull requests meet high standards of quality and readiness. See [docs/dogfooding.md](docs/dogfooding.md) for more details.

## Usage

Add a workflow file to your repository (e.g., `.github/workflows/agentproof.yml`):

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
      - uses: mattfred/agentproof-pr@main
        with:
          token: ${{ github.token }}
          comment_on_pr: true
```

## Configuration

See [docs/configuration.md](docs/configuration.md) for full configuration options.

Example configurations are available for:
- [Generic](examples/config.generic.yml)
- [React](examples/config.react.yml)
- [Flutter](examples/config.flutter.yml)
- [Android/Kotlin](examples/config.android-kotlin.yml)
