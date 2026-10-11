# GitBook reading guide

The walkthrough is organized as seven linked Markdown pages under docs/. SUMMARY.md defines their reading order. The public GitHub repository is the canonical source for the free kit and downloads.

The GitBook guide is a manually published companion to edition 1.1.0. Automatic Git Sync is not connected for this kit. Update and check the companion when the GitHub instructions change.

## Follow the guide

Read the overview, prepare the workspace, complete the first task, then inspect the file map. Use the local/cloud and troubleshooting pages when they apply. The toolkit files remain in the repository; GitBook is the reading companion.

## Git Sync configuration

docs/.gitbook.yaml sets the content root, README and SUMMARY for this space. When a maintainer connects Git Sync, map the space to docs/ and use the initial GitHub → GitBook direction. Verify the imported pages before making later changes from either side.

Git Sync setup requires its supported GitBook interface and an authorized GitHub integration. A configuration file alone does not establish an active connection. Keep source and published content versions clear when updating manually.

Official guidance: [content configuration](https://gitbook.com/docs/docs-as-code/git-sync/content-configuration) and [importing from GitHub](https://gitbook.com/docs/guides/editing-and-publishing-documentation/import-or-migrate-your-content-to-gitbook-with-git-sync).

Next: [troubleshooting](troubleshooting.md).
