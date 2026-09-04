
# Deployment capabilities

. The skills teach your AI agent how to work with Dell Automation Platform , while the CLI provides the
commands that perform the operations.
Skills are the knowledge that guides your AI agent, while CLI commands are the actions that perform the work. They work
together in a tight integration where skills trigger the appropriate CLI commands based on your natural language prompts.
There is no separate skill invocation step. You can interact with skills through natural-language prompts in the IDE or by using
dap-bpa CLI commands. Skills encapsulate specific infrastructure capabilities that enable greater flexibility, reusability, and
maintainability of blueprint deployments.
Blueprint AI Assistant ships four skills, each integrated with specific CLI command groups:

Table 3. Capability coverage overview
Capability area Skills involved Primary CLI commands Coverage status
Blueprint authoring dap, dap-scripts , dap-
service-composition
dap-bpa knowledge , dap-bpa
blueprint
Fully covered
Blueprint review dap dap-bpa blueprint lint , dap-bpa
blueprint validate
Partially covered
Blueprint deployment dap, dap-deployment-
update
dap-bpa orchestrator Fully covered
Blueprint
maintenance
dap, dap-deployment-
update
dap-bpa orchestrator deployment-
updates
Fully covered
> **NOTE:** The Blueprint AI Assistant  can lint and validate the blueprint, but it does not test the blueprint in a real environment.
