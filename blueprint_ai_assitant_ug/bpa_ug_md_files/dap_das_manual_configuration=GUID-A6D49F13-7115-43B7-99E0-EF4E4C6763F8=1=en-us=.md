# Manual configuration
For advanced users who need manual configuration, the setup wizard creates a
    configuration file at ~/.blueprint-assist/config.json. 
	 
		
		Configuration file structure:
      {
  "orchestrators": {
    "stamp3": {
      "url": "https://orchestrator.v1.dap.stamp3.tme.lab",
      "tenant": "default_tenant",
      "credentials": {
        "type": "client_credentials",
        "client_id": "<your-client-id>",
        "client_secret": "<your-client-secret>"
      },
      "ssl_verify": false,
      "skip_ssl_verification": true
    },
    "production": {
      "url": "<https://your-production-orchestrator.example.com>",
      "tenant": "<your-tenant-id>",
      "credentials": {
        "type": "client_credentials",
        "client_id": "<your-client-id>",
        "client_secret": "<your-client-secret>"
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
      The Blueprint AI Assistant interacts with AI models in two distinct
        ways.  The IDE agent is configured separately. 
	 
    
      Monitor diagnostician
      The model_id field in the llm configuration block applies
        to the Monitor diagnostician. It is stored in
          ~/.blueprint-assist/config.json file.
      The following table lists the available LLM providers and model_id:
      
        LLM providers
        LLM providers
        
          
          
          
          
            
              Provider
              model_id
              Notes
            
          
          
            
              aws_bedrock
              anthropic.claude-3-7-sonnet-20250219-v1:0
              Latest Claude with the highest-quality blueprint repair
            
            
              aws_bedrock
              anthropic.claude-3-5-sonnet-20240620-v1:0
              It is the default recommended model
            
            
              aws_bedrock
              anthropic.claude-3-opus-20240229-v1:0
              Higher quality, slower and more expensive
            
            
              aws_bedrock
              anthropic.claude-3-haiku-20240307-v1:0
              Fast and low-cost, best for simple repairs
            
            
              openai
              gpt-4o
              Best OpenAI option, comparable to Claude 3.5 Sonnet
            
            
              openai
              gpt-4-turbo
              Good for complex multi-step reasoning
            
            
              openai
              gpt-4
              Strong baseline, cost is lower than gpt-4-turbo or
                  gpt-4o
            
          
        
      
    
    
      IDE AI agent
      The AI agent is configured within the user IDE, not in the
          ~/.blueprint-assist/config.json file.
      
        IDE AI agents
        IDE AI agents
        
          
          
          
          
            
              IDE
              Model
              Notes
            
          
          
            
              Devin Desktop
              Cascade (SWE-1)
              It is the recommended model as it has native Blueprint AI Assistant skill support with strong code reasoning
            
            
              Claude Code
              Claude 3.5 / 3.7 Sonnet
              It is the recommended model as it has native Blueprint AI Assistant skill support with strong code reasoning
            
            
              Devin
              swe-1 (Cognition)
              Advanced autonomous SWE agent and it requires manual skill setup
            
          
        
      
     
  