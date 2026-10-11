# Understand the file map

The starter workspace gives each part one responsibility.

| File or folder | Responsibility | What you change for a new task |
| --- | --- | --- |
| AGENTS.md | Project instructions and boundaries | The agreed task scope and output locations |
| inputs/task.md | One requested outcome and completion checklist | The question, reader, output and checks |
| sources/source-notes.json | The evidence used by the task | Named source records and their dates |
| .agents/skills/source-brief/SKILL.md | A reusable procedure | Change it only when the repeated procedure changes |
| .codex/agents/*.toml | Optional specialist roles | Narrow responsibility and return format |
| templates/source-brief.md | The desired report shape | The sections your reader needs |
| reports/ | Generated deliverables | Read and verify the result |

Codex's [instruction guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md), [custom-role guide](https://learn.chatgpt.com/docs/agent-configuration/subagents) and [skill guide](https://learn.chatgpt.com/docs/build-skills) explain native discovery. The remaining folder names are conventions chosen for this exercise.

Copy the workspace as a unit. The role files define the required name, description and developer instructions without pinning a model, adding connectors or overriding your selected permissions. They are optional; a single main session is sufficient for the first task.

Next: [choose local or cloud execution](local-and-cloud.md).
