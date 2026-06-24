# Build blueprints with Blueprint AI Assistant
Before building blueprints, plan and define the requirements.
    This chapter demonstrates the blueprint creation procedure using a
      VMware cluster within Dell Private Cloud.
    
      Define blueprint requirements
      Before creating a blueprint, clearly define:
      
        Define requirements
        Define requirements
        
          
          
          
            
              Category
              Definition
            
          
          
            
              Purpose
              The type of infrastructure this blueprint will deploy
            
            
              Scope
              Inclusion and exclusion of components
            
            
              Target environment
              On-premises data center, Kubernetes, or cloud
            
            
              Constraints
              Budget, timeline, compliance requirements
            
            
              Dependencies
              Requirement of external systems or services
            
          
        
      
    
    
      Research existing blueprints
      Use the knowledge base to find similar blueprints as starting points:
      
        Search relevant blueprints by
          keyword.bpa knowledge blueprints find "storage"
bpa knowledge blueprints find "network"
bpa knowledge blueprints find "kubernetes"
        Search with plugin
          filter.bpa knowledge blueprints find "vmware" --plugin vsphere
        Get a complete blueprint with all
          files.bpa knowledge blueprints get vsphere-vm --include-files
      
    
    
      Learn and research about the plugins from the documentation
      
        List available node types for a
          plugin.bpa knowledge plugins list vsphere
        Get detailed information about a specific node
          type.bpa knowledge plugins get vsphere dell.nodes.vsphere.Server
        Get the full plugin documentation.
          bpa knowledge plugins docs vsphere

        Get documentation for a specific node type.
          bpa knowledge plugins node-type-docs vsphere dell.nodes.vsphere.Server
      
     
  