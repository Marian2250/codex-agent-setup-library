# Source-backed brief

Question: What belongs in project instructions, a custom agent role and a reusable skill for a person starting with Codex?

Source snapshot: **11 October 2026**. This brief uses the three supplied source-note records. These dated notes do not establish current account access or installed-version behavior.

## Supported distinctions

| Concept | Supported distinction | Source ID and URL |
| --- | --- | --- |
| Project instructions | The instruction-discovery notes describe one non-empty instruction file per directory, with the override name considered before the standard name and configured fallbacks. Ordinary project notes require an explicit read. | S01 — [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) |
| Custom role | The custom-role notes require a standalone role file to contain `name`, `description` and `developer_instructions`. They distinguish local role-file discovery from hosted Work subagent availability. | S02 — [Subagents and custom roles](https://learn.chatgpt.com/docs/agent-configuration/subagents) |
| Reusable skill | The skill-authoring notes require a `SKILL.md` name and description, recommend precise triggers, and identify `.agents/skills` as a local authoring path. | S03 — [Build skills](https://learn.chatgpt.com/docs/build-skills) |

## Recommendation

**Recommendation for this exercise:** start in the main session with the supplied project instructions, one bounded task, the source-brief skill and the output template. Complete and review one report before adding delegation. The optional roles are useful to explore later; this task does not need several agents to answer its small question.

This is a choice for the exercise, not a native product requirement.

## Open questions

- Does the reader's current runtime discover these local role files and this skill?
- Does the reader's account expose custom-role delegation on the chosen surface?
- Which current instruction-size limits and loading rules apply to the installed version? The S01 notes explicitly say to verify loading where guides differ.
- Do the current official pages still agree with these snapshot notes?

Those questions require current documentation or runtime checks beyond the permitted sources. This exercise does not answer them.

## Completion check

- The question and source snapshot date are visible.
- All three concepts have a distinction supported by their supplied record.
- The product facts cite matching source IDs and official URLs.
- The recommendation is labelled and separated from the sourced distinctions.
- Current access and version-sensitive behavior remain open.
- In the copied exercise workspace, the only produced file is `reports/source-brief.md`; inputs and configuration remain unchanged.

All six input criteria are complete for this worked exercise.
