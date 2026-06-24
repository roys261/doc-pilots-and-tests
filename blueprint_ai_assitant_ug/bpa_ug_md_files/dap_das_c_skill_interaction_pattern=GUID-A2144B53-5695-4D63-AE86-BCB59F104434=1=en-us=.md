# Skill interaction patterns
The Blueprint AI Assistant skills can interact in various
    patterns.
    
      Sequential pattern
      Skills are run in a specific order where later skills depend on earlier ones.
      Example scenario: Network → Compute → Storage → Application
    
    
      Parallel pattern
      Multiple skills can run simultaneously when they do not depend on each other.
      Example scenario: [Network, Storage] → Compute
    
    
      Conditional pattern
      Skills are run based on conditions or parameters.
      Example scenario:
      If (platform == Kubernetes) → Kubernetes Skill
If (platform == VM) → VM Skill
    
    
      Composite pattern
      Multiple skills are combined to create complex deployments.
      Example scenario: Network + Compute + Storage + Security → Complete Application
          Stack
     
  