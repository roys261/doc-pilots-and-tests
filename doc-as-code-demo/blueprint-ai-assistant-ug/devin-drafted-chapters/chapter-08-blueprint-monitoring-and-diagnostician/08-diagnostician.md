---
title: "Blueprint monitoring and diagnostician"
chapter: 8
topic: "Diagnostician"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "32-33"
---

# Diagnostician

Blueprint AI Assistant is capable of automated lifecycle testing. It requires an active Dell Automation Platform orchestrator
connection as it uploads, deploys, and runs your blueprint against real infrastructure.
Automated lifecycle testing
The dap-bpa monitor command automates the complete blueprint lifecycle for testing and validation by performing the
following steps:

- Upload the blueprint to the Dell Automation Platform orchestrator  (idempotent)

- Create deployment from provided inputs

- Run the install workflow and poll to completion

- Run any additional workflows

- Validate assertions against outputs

- Run the uninstall  workflow unless --keep  is set

- Clean up the deployment and blueprint
The following is a sample command:
dap-bpa monitor <blueprint_name> / \
  --inputs '{"vm_name": "test-vm", "network": "default"}' \
  --workflow install \
  --assert 'vm_ip=192.168.*' \
  --keep
It generates the following output:

- A structured JSON with the filename RunReport.json . You can retrieve this report by running the dap-bpa monitor
--status command.

- You can view the real-time progress in the terminal with live updates during the execution.

- Once the session is complete, it triggers a desktop notification.
