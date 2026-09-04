
# Review capabilities

Security scanning
Skill: dap (security best practices only)
Current coverage: Manual best practices enforced through linting

- Secret handling standards

- No secrets in capabilities or outputs

- No secrets in runtime_properties
Limitations: No automated vulnerability scanning, dependency security analysis, or compliance framework mapping
Compliance checks
Skill: dap (compliance rules only)
Current coverage: Blueprint standards enforced through linting

- DSL version compliance

- Multi-file structure requirements

- Input completeness standards

- Lifecycle operation completeness
Limitations: No automated compliance framework mapping, policy-as-code validation, or regulatory compliance checking
Deployment capabilities
Deployment planning
Skills: dap, dap-service-composition
CLI commands: dap-bpa knowledge
Skills trigger these CLI commands for research:
dap-bpa knowledge blueprints find " <deployment pattern> "
dap-bpa knowledge blueprints get <id> --include-files
Key features:

- Service composition patterns

- Sub-deployment hierarchy

- Resource dependency mapping

- Capability flow design
Pre-deployment checks
Skill: dap
CLI commands: dap-bpa blueprint , dap-bpa knowledge , dap-bpa orchestrator
Skills trigger this complete validation pipeline:
dap-bpa blueprint lint --file blueprint.yaml --verify
dap-bpa blueprint validate-all --file blueprint.yaml
dap-bpa knowledge plugins list <plugin>
dap-bpa orchestrator blueprints list
Key features:

- Blueprint validation (DSL compliance, schema validation)

- Orchestrator readiness (connectivity, authentication, resource availability)
Deployment execution
Skills: dap, dap-deployment-update
CLI commands: dap-bpa orchestrator
Skills trigger these CLI commands for deployment:
dap-bpa orchestrator blueprints upload --file blueprint.yaml --id <blueprint_id> --
revision <version>
dap-bpa orchestrator deployments create --blueprint-id <blueprint_id> --inputs
inputs.json
dap-bpa orchestrator executions get <execution_id> --fields id status error
dap-bpa orchestrator events get <execution_id>
Key features:

- Multi-file archive upload

- Revision management

- Deployment creation with input validation

- Real-time execution monitoring and event streaming
Post-deployment verification
Skills: dap, dap-deployment-update
CLI commands: dap-bpa orchestrator
Skills trigger these CLI commands for verification:
dap-bpa orchestrator deployments get <deployment_id> --fields id status capabilities
dap-bpa orchestrator executions get <execution_id> --fields id status error
dap-bpa orchestrator events get <execution_id>
Key features:

- Deployment status verification

- Execution completion verification

- Capability validation

- Resource state verification
