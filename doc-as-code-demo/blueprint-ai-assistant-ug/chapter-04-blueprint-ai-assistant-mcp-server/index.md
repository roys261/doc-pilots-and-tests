---
title: "Blueprint AI Assistant  MCP server"
chapter: 4
topic: "Overview"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "15-16"
---

# Chapter 4: Blueprint AI Assistant  MCP server

Blueprint AI Assistant MCP server
The Blueprint AI Assistant MCP server is an alternative interface to the dap-bpa CLI that exposes Dell Automation Platform
operations through the Model Context Protocol standard.
The current availability is limited to SaaS orchestrator deployments only.
Instead of running dap-bpa commands locally, you can:

- Connect your IDE or AI agent to the remote MCP server.

- Invoke blueprint operations programmatically.

- Stream results back to your development environment.

- Maintain a persistent session with the orchestrator.
The Blueprint AI Assistant MCP server allows you to connect your CI/CD pipeline and third-party automation tools.
Prerequisites for SaaS orchestrator access

- Orchestrator: Dell Automation Platform  SaaS instance

- Authentication: The MCP server uses token-based authentication. Valid Dell Automation Platform  credentials:
○ Portal domain : Your Dell Automation Platform SaaS portal domain
○ Org ID : Your organization ID
○ Client ID : Service account or user client ID
○ Client secret : Associated client secret

- Network: HTTPS connectivity to https:// <mcp-server-host> /

- MCP client: An application or IDE that supports the Model Context Protocol
Supported MCP clients

- Devin (through dap-bpa  skill integration)

- Claude Code (through dap-bpa  skill integration)

- Custom applications by implementing the MCP client protocol

- AI agents with MCP client support

## Topics in this chapter

- [Configure the MCP server](04-configure-the-mcp-server.md)

## Related training material from this repository

| Repository section | Summary |
| --- | --- |
| [1.sections/section-019-mcp-server/content.md](../1.sections/section-019-mcp-server/content.md) | **Section 019: Blueprint Assist MCP Server** — > **Integration reference: Model Context Protocol (MCP) servers for Blueprint Assist.** This section covers both MCP server components — the gateway for direct DAP operations and the agent server for natural-language queries — and how to connect MCP-compatible clients to each. ## Overview The Dell A |
