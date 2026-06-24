# Skills-based architecture
The Blueprint AI Assistant skills-based architecture marks a shift
    from monolithic blueprint templates to modular, composable skills. This approach enables greater
    flexibility, reusability, and maintainability of infrastructure deployments.
    
      Core principles
      
        Modularity: Each skill encapsulates a specific capability.
        Composability: Skills can be combined to create complex deployments.
        Reusability: Skills can be reused across multiple blueprints.
        Independence: Skills can be developed, tested, and updated independently.
        Discoverability: Skills are easily discoverable and self-documenting.
      
    
    
      Architecture components
      
        Architecture components
        Architecture components
        
          
          
          
            
              Component
              Purpose
            
          
          
            
              Skill definition
              Each skill is defined by:
                  skill.md: Metadata and documentation
                  Implementation: Code that runs the skill
                  Schema: I/O definitions
                  Dependencies: Required skills or resources 
                
            
            
              Skills registry
              It is a central repository that:
                  Stores skill definitions and implementations
                  Provides version control
                  Enables skill discovery
                  Manages skill dependencies
                
            
            
              Skills engine 
              It is the runtime environment that: 
                  Parses skill definitions
                  Resolves dependencies
                  Runs skills in the correct order
                  Handles skill lifecycle
                
            
          
        
      
     
  