# Start your first source-backed task

Open this folder as your working folder in an existing Codex session. Keep `.agents/` and `.codex/` when copying it. Review AGENTS.md first.

Paste this request:

```text
Read AGENTS.md and .agents/skills/source-brief/SKILL.md.
Complete inputs/task.md using only sources/source-notes.json.
Write reports/source-brief.md using templates/source-brief.md.
Keep the snapshot date visible and cite each product fact by source ID
and URL. Separate recommendations from facts. Do not refresh sources,
change configuration or take external actions. Review the result against
the completion checklist in inputs/task.md.
```

When the brief exists, read it and check every cited claim against the source notes. Your own account and selected permissions determine what Codex can do. The first exercise uses public notes and does not need new dependencies or credentials.

Full walkthrough: https://github.com/Marian2250/codex-agent-setup-library/blob/main/docs/start-here.md

Free reference library: https://github.com/Marian2250/codex-agent-setup-library
