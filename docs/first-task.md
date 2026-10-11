# Complete the first task

Open the starter workspace and paste this request into its Codex session:

```text
Read AGENTS.md and .agents/skills/source-brief/SKILL.md.
Complete inputs/task.md using only sources/source-notes.json.
Write reports/source-brief.md using templates/source-brief.md.
Keep the snapshot date visible and cite each product fact by source ID
and URL. Separate recommendations from facts. Do not refresh sources,
change configuration or take external actions. Review the result against
the completion checklist in inputs/task.md.
```

## Check the output

Open reports/source-brief.md. Check that it answers the three-concept question, keeps the snapshot date, and cites the corresponding source ID and URL for each product fact. Recommendations should be visibly separate from sourced distinctions.

Compare its structure with [the worked example](https://github.com/Marian2250/codex-agent-setup-library/blob/main/examples/first-task-source-brief.md). Wording can vary. Unsupported statements, incorrect source links and missing checks need correction before you use the report.

Ask for a narrow correction:

```text
Check the brief against inputs/task.md and sources/source-notes.json.
Identify claims whose cited record does not support them. Correct only
those claims and any missing completion items in reports/source-brief.md.
Preserve the source snapshot date and do not change the inputs.
```

The optional starter_reviewer role can return this review when your runtime supports custom roles. Ask the parent session to save any accepted correction. The main-session review works without delegation.

## Finish one task before extending it

The first task is complete when the report exists and meets the input checklist. For a different real task, update a copy of inputs/task.md, choose relevant sources, and agree on the output and permitted actions before running it.

Next: [understand the file map](file-map.md).
