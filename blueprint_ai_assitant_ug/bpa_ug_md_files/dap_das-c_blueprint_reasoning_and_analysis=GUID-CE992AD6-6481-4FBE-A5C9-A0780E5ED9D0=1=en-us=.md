# Blueprint analysis
Blueprint AI Assistant can analyze, explain, and understand
    blueprints. It does not require an active connection to the Dell
      Automation Platform orchestrator. It operates on your blueprint YAML files locally using
    the Blueprint AI Assistant skills and the knowledge base in your
    IDE. 
	 Blueprint AI Assistant has powerful reasoning capabilities to analyze
      existing blueprints, understand their structure, and explain their behavior. This is useful in
      the following situations:
    
      Audit infrastructure deployments
      Understand the inherited blueprints
      Learn from existing patterns
      Troubleshoot any deployment issues
      Document about the infrastructure
    
    
      Types of analysis
      Command:
      bpa analyze <blueprint-name>
      It provides the following information:
      
        Blueprint summary
        Skills used
        Resource dependencies
        Estimated costs
        Security considerations
      
    
    
      Detailed analysis
      Command:
      bpa analyze <blueprint-name> --detailed
      It provides the following information:
      
        Step-by-step execution flow
        Parameter values
        Resource relationships
        Potential issues or warnings
      
    
    
      Comparative analysis
      Command:
      bpa compare <blueprint-a> <blueprint-b>
      It highlights the difference between two blueprints on the following aspects:
      
        Differences in skills
        Parameter variations
        Resource count differences
        Cost implications
      
     
  