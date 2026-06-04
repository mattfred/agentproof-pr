# Troubleshooting AgentProof PR

## Common Issues

### 1. Action fails with "Resource not accessible by integration"
**Cause**: The GitHub token does not have sufficient permissions to post a comment or read the repository.
**Solution**: Ensure your workflow file includes the required permissions:
```yaml
permissions:
  contents: read
  pull-requests: write
  issues: write
```

### 2. Score is lower than expected
**Cause**: Missing sections in PR body or detected placeholders.
**Solution**: 
- Check the PR description for headers like "Summary", "Acceptance Criteria", etc.
- Check the "Suggested Fixes" in the AgentProof PR comment for specific missing items.
- Run a local grep for the patterns defined in `placeholder_patterns`.

### 3. Screenshots rule fails even though I added an image
**Cause**: The action might not be recognizing the image format or the location.
**Solution**: Ensure the image is embedded using standard Markdown `![alt](url)` or HTML `<img>` tags. If you uploaded it via GitHub's PR editor, it should work automatically.

### 4. Rule `linked_ticket` fails
**Cause**: No ticket reference was found matching the `ticket_patterns`.
**Solution**: 
- Add a reference like `JIRA-123` or `#456` to your PR description.
- If your team uses a different pattern, update `ticket_patterns` in your `.agentproof.yml`.

## Debugging

To see more detailed logs from AgentProof PR, you can enable Step Debug Logging in GitHub Actions. Set the repository secret `ACTIONS_STEP_DEBUG` to `true`.

## Getting Help

If you're still stuck, please [open an issue](https://github.com/mattfred/agentproof-pr/issues) with:
1. Your workflow YAML.
2. Your `.agentproof.yml` (if any).
3. The logs from the failed action run.
