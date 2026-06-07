# Comparison: AgentProof PR vs. AI Code Review Tools

A common question is: "How is AgentProof PR different from AI-powered code review tools (like CodeRabbit, PR-Agent, etc.)?"

While they might seem similar at first glance, they serve very different purposes in the development lifecycle.

## AI Code Review Tools
AI Code Review tools focus on the **content of the code**. They use LLMs to:
- Suggest logic improvements.
- Find potential bugs.
- Suggest refactors.
- Summarize what the code does.

**Goal:** To help you write better code.

## AgentProof PR
AgentProof PR focuses on the **readiness of the Pull Request**. It is a deterministic, rule-based engine that ensures:
- **Context is present:** Is there a linked ticket? Is there a summary?
- **Evidence is provided:** Are there screenshots? Is there test evidence?
- **Hygiene is maintained:** Are there leftover `console.log` or `TODO` markers?
- **Process is followed:** Does it meet the minimum quality score your team defined?

**Goal:** To stop human reviewers from wasting time on half-finished PRs.

## Key Differences

| Feature | AI Code Review Tools | AgentProof PR |
| :--- | :--- | :--- |
| **Technology** | LLM-based (probabilistic) | Rule-based (deterministic) |
| **Primary Target** | The Code | The PR Process & Metadata |
| **Reviewer Value** | Helps understand code logic | Stops review of incomplete work |
| **Agent Value** | Reviews agent's code | Validates agent's PR hygiene |
| **Privacy** | Often sends code to LLM providers | 100% Local (Runs in GitHub Action) |
| **Cost** | Usually expensive (per seat/usage) | Free & Open Source |

## Can I use both?
**Absolutely.** In fact, we recommend it.

1. **AgentProof PR** runs first. It ensures the PR is complete and follows your team's standards.
2. If AgentProof PR fails, the developer (or AI agent) fixes the PR before a human (or AI reviewer) even looks at it.
3. Once AgentProof PR passes, your **AI Code Review tool** or human reviewers take over to analyze the logic.

By using AgentProof PR as a gate, you ensure that your expensive human and AI review resources are only spent on PRs that are actually ready for review.
