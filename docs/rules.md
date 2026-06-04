# AgentProof PR Rules

AgentProof PR uses a set of rules to evaluate the readiness of a pull request. Each rule contributes to a total score and can be configured as a "blocking rule".

## Rule List

### 1. Linked Ticket (`linked_ticket`)
- **Purpose**: Ensures every PR is tracked by an issue or ticket.
- **Check**: Scans the PR body for patterns like `JIRA-123` or `#456`.
- **Default Weight**: 10

### 2. Summary (`summary`)
- **Purpose**: Ensures the PR has a clear description of changes.
- **Check**: Looks for a "Summary" or "Description" header in the PR body.
- **Default Weight**: 10

### 3. Acceptance Criteria (`acceptance_criteria`)
- **Purpose**: Ensures the PR addresses the required functionality.
- **Check**: Looks for an "Acceptance Criteria" or "AC" section in the PR body.
- **Default Weight**: 20

### 4. Test Evidence (`test_evidence`)
- **Purpose**: Encourages developers to provide proof of testing.
- **Check**: Looks for a "Test Evidence", "Testing", or "How to test" section in the PR body.
- **Default Weight**: 20

### 5. Risk Assessment (`risk`)
- **Purpose**: Identifies potential impact and risks of the changes.
- **Check**: Looks for a "Risk" or "Impact" section in the PR body.
- **Default Weight**: 10

### 6. Rollback Plan (`rollback`)
- **Purpose**: Ensures there is a plan if things go wrong.
- **Check**: Looks for a "Rollback" or "Revert" section in the PR body.
- **Default Weight**: 10

### 7. Screenshots (`screenshots`)
- **Purpose**: Ensures visual changes are documented.
- **Check**: If UI files are changed (based on `ui_paths`), it checks if the PR body contains images or video links.
- **Default Weight**: 10

### 8. Placeholders (`placeholders`)
- **Purpose**: Prevents debug code or unfinished work from being merged.
- **Check**: Scans changed files for patterns like `TODO`, `console.log`, `debugger`, etc.
- **Default Weight**: 10

## Scoring Logic

Each rule is evaluated as Passed or Failed.
- **Passed**: The rule's full weight is added to the total score.
- **Failed**: 0 points are added for that rule.

The final score is normalized to a 0-100 scale.

## Blocking Rules

Any rule can be designated as a "blocking rule" in `.agentproof.yml`. If a blocking rule fails, the entire AgentProof check will fail, regardless of the total score.

```yaml
blocking_rules:
  - linked_ticket
  - placeholders
```
