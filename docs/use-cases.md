# AgentProof PR Use Cases

AgentProof PR is designed to ensure that every pull request meets a baseline of quality before it reaches a human reviewer. This is especially critical in environments where PRs are generated quickly or by non-human actors.

## 🤖 AI Coding Agents
AI agents (like Aider, Roo Code, or GitHub Copilot Workspace) are incredibly productive but can sometimes "forget" the non-coding requirements of a good PR.
- **The Problem:** Agents often submit code without linking to the original issue, providing test evidence, or removing debug logs.
- **The Solution:** AgentProof acts as a quality gate for your agent. If the agent doesn't meet the PR standards, AgentProof fails the check, signaling the agent to go back and fix its own PR description or code before a human is notified.

## 👥 Small Dev Teams
In small teams, every minute spent on code review is a minute taken away from building.
- **The Problem:** Reviewers often waste time pointing out missing descriptions, missing tickets, or "TODO" comments that should have been addressed.
- **The Solution:** AgentProof automates the "nitpicking" phase. Reviewers only get involved once the PR is "human-ready," having passed all basic hygiene checks.

## 🏢 Agencies
Agencies need to maintain high standards across multiple client projects with varying team members.
- **The Problem:** Inconsistent PR quality can lead to client dissatisfaction or technical debt.
- **The Solution:** Standardize PR requirements across all client repos using a shared `.agentproof.yml` configuration. Ensure every delivery meets the same professional standard.

## 👤 Solo Founders
When you are the only developer, it's easy to cut corners on documentation and testing.
- **The Problem:** "I'll remember why I did this later" usually turns into "I have no idea why I did this" six months later.
- **The Solution:** AgentProof acts as your "internal reviewer," forcing you to maintain your own high standards even when you're in a rush. It ensures your future self (or your first hire) can understand your work.

## 🛡️ Reviewer Quality Gates
For larger organizations, AgentProof serves as the first line of defense.
- **The Problem:** Senior engineers are often a bottleneck. Flooding them with incomplete PRs slows down the entire organization.
- **The Solution:** Implement a hard rule: "No human review until AgentProof passes." This ensures that when a senior dev opens a PR, it's already complete with context, evidence, and clean code.
