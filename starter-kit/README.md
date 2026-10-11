# Your first source-backed agent task

This free starter kit turns the reference library into a working folder for one small research task. You will produce a brief that distinguishes project instructions, a custom role and a reusable skill, then check its sources.

**[Follow the walkthrough](../docs/start-here.md)** or [download the starter workspace](https://github.com/Marian2250/codex-agent-setup-library/releases/latest/download/codex-agent-starter-kit.zip).

You can also [read the seven-page guide in GitBook](https://magicaiflow-llc.gitbook.io/codex-agent-starter-kit/). It is a manually maintained companion to the GitHub files.

## Start in a separate folder

Copy the entire `workspace/` folder to a new working folder. Keep its hidden `.agents` and `.codex` directories. Open that folder in an existing Codex session. This distribution does not install anything into your personal Codex settings.

The first exercise uses included, dated source notes. It needs no new API key, cloud service or package installation. Using Codex still requires your own account/access and consumes its normal usage allowance.

## What each part does

```text
workspace/
  AGENTS.md                       Project instructions for the exercise
  README.md                       The short starting guide
  .agents/skills/source-brief/
    SKILL.md                      The reusable research procedure
  .codex/agents/
    starter_researcher.toml        Optional researcher role
    starter_reviewer.toml          Optional reviewer role
  inputs/task.md                  One task, with a completion check
  sources/source-notes.json        Three real references from the library
  templates/source-brief.md        The expected output shape
  reports/                        Where your generated brief belongs
```

The optional role files inherit runtime/model settings. They do not configure credentials, install tools or replace your selected permissions. Start with the main session; use a specialist only when your runtime exposes custom-role delegation.

## The prompt

```text
Read AGENTS.md and .agents/skills/source-brief/SKILL.md.
Complete inputs/task.md using only sources/source-notes.json.
Write reports/source-brief.md using templates/source-brief.md.
Keep the source snapshot date visible, cite each product fact by source ID
and URL, and separate recommendations from facts. Do not refresh sources,
change configuration or take external actions for this first exercise.
After writing, review the brief against the completion checklist in task.md.
```

Compare the result with [the worked example](../examples/first-task-source-brief.md). The example demonstrates the content and citation standard; it is not a promise that every model will return identical wording.

Next: [complete the first task](../docs/first-task.md), [understand the file map](../docs/file-map.md), or [choose a local/cloud surface](../docs/local-and-cloud.md).
