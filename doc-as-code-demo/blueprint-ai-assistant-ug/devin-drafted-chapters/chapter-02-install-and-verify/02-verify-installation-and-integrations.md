---
title: "Install and verify"
chapter: 2
topic: "Verify installation and integrations"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "9-10"
---

# Verify installation and integrations

After installing Blueprint AI Assistant and its integrations, you can verify that the installation and configurations were completed
successfully in your environment.
Perform the following checks to verify that your system is operating correctly:

- Verify installation status:
○ dap-bpa status

- Validate knowledge base access:
○ dap-bpa knowledge plugins list helm

- Test functionality in your development environment or AI agent interface. Open your IDE, terminal, or agent workspace, for
example: Devin, and try the following commands:
○ @dap-bpa list the available node types for vSphere
○ @dap-bpa create a blueprint with three VMs in a cluster
○ @dap-bpa explain the properties of dell.nodes.compute.VM
