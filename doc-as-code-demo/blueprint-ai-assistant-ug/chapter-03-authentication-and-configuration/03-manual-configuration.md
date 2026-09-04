
# Manual configuration

For advanced users who need manual configuration, the setup wizard creates a configuration file at ~/.blueprint-assist/
config.json .
Example configuration file structure:
{
  "orchestrators": {
    "stamp3": {
      "url": "https://orchestrator.v1.dap.stamp3.tme.lab",
      "tenant": "default_tenant",
      "credentials": {
        "type": "client_credentials",
        "client_id": " <your-client-id> ",
        "client_secret": " <your-client-secret> "
      },
      "ssl_verify": false,
      "skip_ssl_verification": true
    },
    "production": {
      "url": " <https://your-production-orchestrator.example.com> ",
      "tenant": " <your-tenant-id> ",
      "credentials": {
        "type": "client_credentials",
        "client_id": " <your-client-id> ",
        "client_secret": " <your-client-secret> "
      },
      "ssl_verify": true,
      "skip_ssl_verification": false
    }
  },
  "default_orchestrator": "stamp3",
  "llm": {
    "provider": "aws_bedrock",
    "region": "us-east-1",
    "model_id": "anthropic.claude-3-5-sonnet-20240620-v1:0"
  }
}
The Blueprint AI Assistant interacts with AI models in two distinct ways. The IDE agent is configured separately.
Monitor diagnostician
The model_id field in the llm configuration block applies to the Monitor diagnostician. It is stored in ~/.blueprint-
assist/config.json file.
IDE AI agent
The AI agent is configured within the user IDE, not in the ~/.blueprint-assist/config.json file.
