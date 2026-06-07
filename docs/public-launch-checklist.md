# Public Alpha Launch Checklist

This checklist tracks the final steps for the public alpha launch of AgentProof PR.

## 🛠 Pre-Launch Safety & Audit
- [x] Create `agent-9-public-safety-audit` branch.
- [ ] Audit codebase for secrets, tokens, and private URLs.
- [ ] Confirm `.gitignore` prevents `.env` or local config leaks.
- [ ] Ensure all documentation mentions Alpha status clearly.
- [ ] Update README with hero message and demo.
- [ ] Ensure all examples include `actions/checkout`.
- [ ] Run `npm run all` and ensure all tests pass.

## 📄 Documentation Pass
- [ ] Add `docs/public-launch-checklist.md`.
- [ ] Add `docs/launch-post.md` (Social Media Drafts).
- [ ] Add `docs/marketplace-listing-draft.md`.
- [ ] Update version tags to public-friendly `@v1` or `@v0.2.0-alpha`.

## 🚀 Launch Day
- [ ] Merge `agent-9-public-safety-audit` to `main`.
- [ ] Create a new tag/release (v0.2.0-alpha).
- [ ] **GitHub Marketplace:** Submit the action to the marketplace.
- [ ] **Twitter/X:** Announce the launch with a GIF of the "Bad" vs "Fixed" PR.
- [ ] **LinkedIn:** Post about "Stop reviewing half-finished AI-generated PRs."
- [ ] **Reddit/Dev.to:** Share in relevant developer communities.
- [ ] **Show HN:** Submit to Hacker News.

## 📈 Post-Launch
- [ ] Monitor GitHub Issues for feedback.
- [ ] Gather feedback via `docs/alpha-feedback.md`.
- [ ] Update roadmap based on user requests.
- [ ] Start planning the "Pro" features.
