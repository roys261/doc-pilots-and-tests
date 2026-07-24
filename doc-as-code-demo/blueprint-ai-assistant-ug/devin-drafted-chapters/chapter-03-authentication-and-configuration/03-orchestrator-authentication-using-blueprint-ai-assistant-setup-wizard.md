---
title: "Authentication and configuration"
chapter: 3
topic: "Orchestrator authentication using Blueprint AI Assistant  setup wizard"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "11-10"
---

# Orchestrator authentication using Blueprint AI Assistant  setup wizard

Steps

1. Run the interactive Blueprint AI Assistant  setup wizard.
dap-bpa setup

2. The setup wizard prompts you for:

- Orchestrator configuration: URL, tenant, and authentication credentials

- (Optional) Configuration of the connection to the Dell Blueprint AI Assistant  MCP server. For more information, see
Blueprint AI Assistant MCP server .

- Default settings: Default orchestrator profile and preferences

3. Verify the setup by checking the current setup.
dap-bpa status
It displays the following information:

- Configured orchestrator profiles

- Credential validation status

- Available capabilities (blueprint linting, plugin docs, Dell Automation Platform  API access)

4. You can configure multiple orchestrator environments.
a. Run setup again to add additional orchestrators.
dap-bpa setup
b. Select the specific orchestrator.
dap-bpa orchestrator blueprints list --orchestrator <orchestrator_name>
