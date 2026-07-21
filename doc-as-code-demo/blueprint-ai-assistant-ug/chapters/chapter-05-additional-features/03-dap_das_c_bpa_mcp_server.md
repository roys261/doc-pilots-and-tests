# Blueprint AI Assistant
    MCP server
The Blueprint AI Assistant MCP server is an alternative interface
    to the dap-bpa CLI that exposes Dell Automation
      Platform operations through the Model Context Protocol standard.
    The current availability is limited to SaaS orchestrator deployments only.
    Instead of running dap-bpa commands locally, you can:
    
      Connect your IDE or AI agent to the remote MCP server.
      Invoke blueprint operations programmatically.
      Stream results back to your development environment.
      Maintain a persistent session with the orchestrator.
    
    The Blueprint AI Assistant MCP server allows you to connect your CI/CD
      pipeline and third-party automation tools.
    
      Prerequisites for SaaS orchestrator access
      
        Orchestrator: Dell Automation Platform SaaS instance
        Authentication: The MCP server uses token-based authentication. Valid Dell Automation Platform credentials: 
            Portal domain: Your Dell Automation
                Platform SaaS portal domain
            Org ID: Your organization ID
            Client ID: Service account or user client ID
            Client secret: Associated client secret
          
        Network: HTTPS connectivity to
            https://<mcp-server-host>/
        MCP client: An application or IDE that supports the Model Context Protocol
      
    
    
      Supported MCP clients
      
        Devin (through dap-bpa skill integration)
        Claude Code (through dap-bpa skill integration)
        Custom applications by implementing the MCP client protocol
        AI agents with MCP client support
      
    
  