---
title: "Blueprint monitoring and diagnostician"
chapter: 8
topic: "Prerequisites"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "32-31"
---

# Prerequisites

Confirm that all prerequisites are in place before you run the dap-bpa monitor command.

- Verify the Dell Automation Platform orchestrator  is configured and reachable using the command dap-bpa status .

- LLM credentials are configured using the dap-bpa setup  command. It is required for the auto-repair diagnostician.

- Blueprint linted and validated locally before running:
dap-bpa blueprint lint --file <blueprint_name> /blueprint.yaml --verify
dap-bpa blueprint validate-all --file <blueprint_name> /blueprint.yaml
Diagnostician
When a blueprint fails, the built-in diagnostician can automatically repair it.
You must consider the following:

- The built-in diagnostician runs automatically when you configure an LLM adapter during the initial setup.

- You cannot enable or disable the diagnostician manually. There is no flag to enable it and it is automatically enabled when an
LLM is configured.

- The monitoring agent retries up to a built-in limit of three attempts.
The diagnostician follows these steps in the auto-repair process:

- Analyzes execution events to identify the root cause.

- Classifies the failure into one of the following categories:
○ blueprint_error
○ resource_unavailable
○ network_timeout
○ unknown

- Generates a solution through the configured LLM adapter.

- Applies the solution and retries execution for up to three attempts.

- Reports the repair attempts and outcomes in the RunReport  file.
> **NOTE:** Only blueprint_error  failures are auto-fixed. The other categories are escalated immediately without a repair
attempt.
Once the LLM adapter is configured with the setup wizard, you can run the following command for monitoring:
dap-bpa setup
dap-bpa monitor --file <blueprint.yaml>
