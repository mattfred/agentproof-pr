# Configuration

AgentProof PR can be configured using a `.agentproof.yml` file in the root of your repository.

## Core Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `minimum_score` | `number` | `80` | The minimum score (0-100) required to pass. |
| `fail_on_blockers` | `boolean` | `true` | Whether to fail the action if a blocking rule fails, even if the score is above minimum. |
| `blocking_rules` | `string[]` | `[]` | List of rule IDs that should block the PR if they fail. |

## Rule-Specific Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `require_linked_ticket` | `boolean` | `true` | Whether a linked ticket is required. |
| `require_summary` | `boolean` | `true` | Whether a summary section is required in the PR body. |
| `require_acceptance_criteria` | `boolean` | `true` | Whether an acceptance criteria section is required. |
| `require_test_evidence` | `boolean` | `true` | Whether test evidence is required. |
| `require_risk` | `boolean` | `true` | Whether risk notes are required. |
| `require_rollback` | `boolean` | `true` | Whether rollback notes are required. |
| `require_screenshot_for_ui_changes` | `boolean` | `true` | Whether screenshots are required if UI files are changed. |
| `ticket_patterns` | `string[]` | `['[A-Z]+-[0-9]+', '#[0-9]+']` | Regex patterns to identify linked tickets. |
| `ui_paths` | `string[]` | (see below) | Glob patterns to identify UI-related files. |
| `placeholder_patterns` | `string[]` | (see below) | Patterns to identify placeholder or debug code. |
| `placeholder_ignore_paths` | `string[]` | (see below) | Glob patterns of files to ignore during placeholder scanning. |

### Default UI Paths
```yaml
ui_paths:
  - "lib/**"
  - "app/**"
  - "src/**/*.tsx"
  - "src/**/*.jsx"
  - "src/**/*.ts"
  - "src/**/*.js"
  - "src/**/*.dart"
  - "android/**"
  - "ios/**"
```

### Default Placeholder Patterns
```yaml
placeholder_patterns:
  - "TODO"
  - "FIXME"
  - "temporary"
  - "hack"
  - "stub"
  - "not implemented"
  - "lorem ipsum"
  - "console.log"
  - "debugger"
```

### Default Placeholder Ignore Paths
```yaml
placeholder_ignore_paths:
  - ".agentproof.yml"
  - ".github/pull_request_template.md"
  - "docs/**"
  - "examples/**"
  - "README.md"
  - "CHANGELOG.md"
  - "package-lock.json"
```

## Customizing Weights

You can customize the importance of each rule by adjusting its weight in the `weights` section.

| Rule | Default Weight |
| :--- | :--- |
| `linked_ticket` | 10 |
| `summary` | 10 |
| `acceptance_criteria` | 20 |
| `test_evidence` | 20 |
| `risk` | 10 |
| `rollback` | 10 |
| `screenshots` | 10 |
| `placeholders` | 10 |

## Example `.agentproof.yml`

```yaml
minimum_score: 90
fail_on_blockers: true
blocking_rules:
  - linked_ticket
  - acceptance_criteria

weights:
  acceptance_criteria: 40
  test_evidence: 40
  
ticket_patterns:
  - "PROJECT-[0-9]+"
```

## Specialized Examples

Find specialized configurations in the [examples](../examples) directory:

- [Generic](../examples/config.generic.yml)
- [TypeScript/Node](../examples/config.typescript.yml)
- [React](../examples/config.react.yml)
- [Flutter](../examples/config.flutter.yml)
- [Android/Kotlin](../examples/config.android-kotlin.yml)
