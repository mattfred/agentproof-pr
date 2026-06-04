# Security and Privacy

AgentProof PR is designed with security and privacy as first-class citizens.

## Data Privacy

- **On-Premise Execution**: AgentProof PR runs entirely within your GitHub Actions runner.
- **No External Calls**: The action does not send your code, PR descriptions, or any metadata to external servers or third-party APIs (unless you explicitly configure it to do so, e.g., by using a custom reporting script).
- **Ephemeral Storage**: All data processed by AgentProof PR is stored in the temporary workspace of the GitHub Action and is deleted once the job completes.

## Permissions

AgentProof PR requires the following minimal permissions:

```yaml
permissions:
  contents: read      # To scan code for placeholders and UI changes
  pull-requests: write # To post reports as comments on PRs
  issues: write       # Required for some PR-related API interactions
```

We recommend using the fine-grained permissions model provided by GitHub Actions to limit the action's scope to only what is necessary.

## Credentials

The action requires a `github-token`. By default, you should use `${{ github.token }}` which is a short-lived token automatically provided by GitHub for each job. This token only has access to the current repository.

## Reporting Vulnerabilities

If you find a security vulnerability, please refer to our [SECURITY.md](../SECURITY.md) file for instructions on how to report it.
