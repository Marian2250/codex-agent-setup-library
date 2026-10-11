# Prepare the workspace

Your first outcome is a short, cited brief. Start with a separate folder so the exercise's instructions and outputs are easy to inspect.

## 1. Get the files

[Download the starter workspace](https://github.com/Marian2250/codex-agent-setup-library/releases/latest/download/codex-agent-starter-kit.zip), unzip it, and open the extracted workspace folder. Keep the hidden `.agents` and `.codex` folders.

If you downloaded the complete library, the same workspace is under `starter-kit/workspace/`. You can also [browse its files on GitHub](https://github.com/Marian2250/codex-agent-setup-library/tree/main/starter-kit/workspace).

## 2. Review the boundaries

Read AGENTS.md and inputs/task.md. The task uses included public source notes and writes one report under reports/. It does not authorize new installations, credential access, configuration changes or publication.

## 3. Open your existing AI workspace

In Codex desktop, select the extracted folder as the local working folder. If you already use the CLI, start Codex from that folder. Follow any normal project-trust prompt after reviewing its contents.

Check the actual folder and chosen permissions. Project instructions guide behavior; the runtime's permissions control tool access. Your own Codex account and normal usage limits still apply.

If your tool cannot write local files, read the input and source notes, ask it to return the report in chat, and save the reviewed result yourself. That is a manual path, not proof of local folder access.

## 4. Read the input

Open sources/source-notes.json. It contains three actual references from the library and their 11 October 2026 snapshot date. The first task uses these notes rather than making new live research calls.

Next: [complete the first task](first-task.md).
