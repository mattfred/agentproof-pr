# Launch Social Media Drafts

## 👔 LinkedIn
**Headline: Stop reviewing half-finished AI-generated pull requests.**

AI agents are fast, but they often miss "the small things": linking to tickets, adding test evidence, including screenshots for UI changes, or cleaning up debug logs.

I just released **AgentProof PR**, a GitHub Action that automatically scores pull requests for human-readiness. It ensures that PRs meet your team's quality standards before a human developer ever lays eyes on them.

Reduce review cycles and cognitive load. Focus on the logic, not the linting.

Check it out: https://github.com/mattfred/agentproof-pr

#GitHubActions #AIEngineering #DeveloperTools #OpenSource #SoftwareEngineering

---

## 🐦 X / Twitter
Stop reviewing half-finished AI-generated PRs. 🛑

AgentProof PR automatically scores your pull requests for human-readiness.

✅ Linked tickets
✅ Test evidence
✅ Placeholder detection (TODO/console.log)
✅ UI Screenshots

Try it now: https://github.com/mattfred/agentproof-pr #BuildInPublic #GitHubActions

---

## 📝 Reddit / Dev.to
**Title: I built a GitHub Action to stop AI agents from shipping messy PRs**

Hey everyone,

I've been using AI agents (Aider, Roo Code, etc.) a lot lately, and while they're incredibly productive, they often miss the "last 5%" of a good PR:
- Linking to the Jira/GitHub issue
- Including test evidence/logs
- Cleaning up `console.log` or `TODO` markers
- Adding screenshots for UI changes

I built **AgentProof PR** to automate these checks. It gives each PR a "Readiness Score" and can even block the merge if the score is too low or if specific blockers (like a missing ticket) are found.

It's currently in **Public Alpha** and runs entirely within your GitHub environment (no data sent to external servers).

Check it out here: https://github.com/mattfred/agentproof-pr

Would love to get some feedback!

---

## 🚀 Show HN
**Show HN: AgentProof PR – Stop reviewing half-finished AI-generated PRs**

Hi HN,

I noticed a pattern where AI-generated pull requests were technically correct but lacked the necessary context (tickets, evidence, hygiene) for a smooth review.

AgentProof PR is a GitHub Action that scores PRs for "human-readiness." It's a "gatekeeper" that ensures basic standards are met before a human reviewer spends time on it.

Features:
- Score-based gating (0-100)
- Configurable rules via `.agentproof.yml`
- Runs entirely in your GHA (Privacy-first)
- Detects missing evidence, UI screenshots, and placeholders.

Repo: https://github.com/mattfred/agentproof-pr

Looking forward to your thoughts and feedback!
