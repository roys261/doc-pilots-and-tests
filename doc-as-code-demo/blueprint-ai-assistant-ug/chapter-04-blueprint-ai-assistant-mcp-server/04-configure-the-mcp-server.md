
# Configure the MCP server

Steps

1. From the IDE terminal, run the following command to ensure that you have a working SaaS orchestrator connection:
dap-bpa orchestrator blueprints list
It should return a list of available blueprints.

2. Obtain the Dell Automation Platform  credentials for the MCP server.

3. To configure the MCP client for your IDE using the dap-bpa  skills:
a. Install the dap-bpa package version 0.26.0 or later.
b. Run dap-bpa setup-ide <your_IDE>
c. Trigger the dap skill. It automatically detects the SaaS orchestrators and routes requests through the MCP server.

4. To configure the MCP server for custom applications, implement an MCP client that:
a. Connects to https:// <mcp-server-host> /.
Blueprint AI Assistant MCP server 15
b. Performs token exchange with your Dell Automation Platform credentials.
c. Invokes blueprint operations using the MCP tools.
d. Handles streaming responses.
16 Blueprint AI Assistant MCP server
