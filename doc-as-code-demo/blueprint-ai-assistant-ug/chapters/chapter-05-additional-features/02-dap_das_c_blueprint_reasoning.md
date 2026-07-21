# Blueprint reasoning
Blueprint AI Assistant can help you to analyze, explain, and
    understand blueprints. It does not require an active connection to the Dell Automation Platform orchestrator.  
	 Blueprint AI Assistant uses the dap skill and the
      knowledge base in your IDE to:
    
      Read the blueprint YAML files and reason about structure and behavior.
      Look up node-types, plugins, and concepts in the local knowledge base.
      Run the local validation primitives to identify issues.
    
    
      Analyze existing blueprints
      To analyze an existing blueprint, open the blueprint in your IDE and ask questions to the
        agent about that blueprint. You can ask any number of questions.
      To validate the findings of Blueprint AI Assistant, run the following
        commands in your IDE terminal:
      dap-bpa blueprint lint --file <blueprint.yaml>
dap-bpa blueprint validate-all --file <blueprint.yaml>
    
    
      Explain about blueprint behavior
      You can ask the agent to generate specific explanations about a blueprint in natural
        language. It can generate responses according to your questions.
    
    
      Compare versions
      To compare two versions of a blueprint, you can use natural language prompts and ask the
        agent to provide a detailed comparison between those versions.
     
  