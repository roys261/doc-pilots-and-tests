
# Resolve the plugin availability issues

Steps

1. Check the available Dell Automation Platform orchestrator  plugins.
dap-bpa orchestrator plugins list

2. Download missing plugins from the Dell Automation Platform  catalog.
dap-bpa orchestrator plugins download < plugin_id > [--output < path >]

3. Upload the plugins to the Dell Automation Platform orchestrator .
dap-bpa orchestrator plugins upload --file <path.wgn> --name <plugin_name>

4. To retrieve the detailed information about a specific plugin installed on the Dell Automation Platform orchestrator , use the
following command:
dap-bpa orchestrator plugins get <plugin_id>
