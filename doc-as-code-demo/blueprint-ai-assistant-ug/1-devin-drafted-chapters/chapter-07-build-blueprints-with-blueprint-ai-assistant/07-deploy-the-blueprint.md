
# Deploy the blueprint

Prerequisites
To deploy custom blueprints, you must have a valid Dell Automation Studio license.
Steps

1. Upload the blueprint to the Dell Automation Platform orchestrator .
dap-bpa orchestrator blueprints upload \
  --file blueprint.yaml \
  --id <blueprint_name> \
  --revision 1.0.0

2. Check the upload status.
dap-bpa orchestrator blueprints get <blueprint_name>

3. Create the deployment with inputs.
dap-bpa orchestrator deployments create \
  --blueprint-id <blueprint_name> \
  --inputs <example_JSON_configs> /deployment-inputs.json \
  --display-name " <deployment_name> "

4. List the deployments.
dap-bpa orchestrator deployments list

5. Perform the installation.
a. Start the install workflow.
dap-bpa orchestrator executions start <deployment_id> --workflow-id install
b. Monitor the deployment.
dap-bpa orchestrator executions get <execution_id>
c. View the events.
dap-bpa orchestrator events get <execution_id>
