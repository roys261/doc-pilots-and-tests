
# Troubleshoot any issues

Steps

1. If upload fails, lint  the blueprint again.
dap-bpa blueprint lint --file blueprint.yaml --verify

2. Check orchestrator connection.
dap-bpa status

3. Verify the availability of the plugin.
dap-bpa orchestrator plugins list
