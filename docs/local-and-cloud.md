# Local and cloud execution

Choose where the task will run before assuming which files and tools it can use.

## Local desktop or CLI

Use the extracted workspace as the working folder. Confirm its visible files, chosen permissions and existing tool access. The first exercise reads public source notes and writes one local report.

## Codex Cloud

Use a configured repository environment and confirm the current checkout and task folder. Personal files, local processes and sign-ins are not automatically available there. Follow the current [Codex Cloud environment guide](https://learn.chatgpt.com/docs/environments/cloud-environments).

## Managed Cloud Environment

If your task exposes the Cloud Environment runtime, read its current environment-status result before treating network access, identity bindings or credentials as ready. Confirm the selected executor's network policy and permitted tools. A configured connection does not prove that a particular API call will succeed.

The first exercise can use the included files without a new connector or cloud purchase. In an attached managed environment, open the workspace from its actual checkout and save the report in its reports/ folder. Do not copy local credentials or change the cloud configuration to make this sample work.

This release's checks were performed locally. A managed Cloud Environment was not exposed in the publishing chat, so no hosted execution result is claimed. These instructions describe the checks to perform when that runtime is actually available.

Next: [GitBook reading guide](gitbook.md).
