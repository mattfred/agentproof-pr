# Releasing AgentProof PR

This guide document the process for releasing new versions of AgentProof PR.

## Versioning Strategy

We follow [Semantic Versioning](https://semver.org/).
- **Major**: Breaking changes to the configuration or core behavior.
- **Minor**: New rules or significant features.
- **Patch**: Bug fixes and documentation updates.

## Release Checklist

- [ ] Ensure all tests pass (`npm run all`).
- [ ] Update `CHANGELOG.md` with the new version and changes.
- [ ] Update the version in `package.json`.
- [ ] Build the project (`npm run build`).
- [ ] Commit changes: `git commit -m "chore: release vX.Y.Z"`.
- [ ] Create a git tag: `git tag -a vX.Y.Z -m "vX.Y.Z"`.
- [ ] Push changes and tags: `git push origin main --tags`.
- [ ] Create a GitHub Release from the tag.
- [ ] Verify the new version is available for use in workflows.

## Tag Recommendation

Always recommend users to pin to a specific tag (e.g., `v0.1.0`) instead of `main` to ensure stability and reproducibility in their CI/CD pipelines.

```yaml
- uses: actions/checkout@v4
- uses: mattfred/agentproof-pr@v0.1.0
```
