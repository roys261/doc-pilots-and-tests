---
title: "Install and verify"
chapter: 2
topic: "Integrate the IDE"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "9-8"
---

# Integrate the IDE

To enable agents to call the skills natively into your IDE, install the Blueprint AI Assistant skills.
Steps

1. Install the skills for Devin:
dap-bpa setup-ide --target windsurf

2. Install the skills for Claude Code:
dap-bpa setup-ide --target claude-code
Results
It installs the following:

- Blueprint AI Assistant  skills for AI-powered blueprint authoring.

- Syntax highlighting and validation.

- Command completion and documentation.

- The dap-bpa  CLI within the integrated terminal of the IDE and agent environment.
