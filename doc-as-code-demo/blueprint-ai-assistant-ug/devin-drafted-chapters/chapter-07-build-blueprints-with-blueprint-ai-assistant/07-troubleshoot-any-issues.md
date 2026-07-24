---
title: "Build blueprints with Blueprint AI Assistant"
chapter: 7
topic: "Troubleshoot any issues"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "31-31"
---

# Troubleshoot any issues

Steps

1. If upload fails, lint  the blueprint again.
dap-bpa blueprint lint --file blueprint.yaml --verify

2. Check orchestrator connection.
dap-bpa status

3. Verify the availability of the plugin.
dap-bpa orchestrator plugins list
