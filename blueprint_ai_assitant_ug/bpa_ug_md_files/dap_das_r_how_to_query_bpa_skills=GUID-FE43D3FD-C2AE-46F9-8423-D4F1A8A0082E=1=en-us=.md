# How to query Blueprint AI Assistant skills
You can query the skills from your IDE terminal to generate results for specific
    tasks.
    
      
        Queries for Blueprint AI Assistant skills
        Queries for Blueprint AI Assistant skills
        
          
          
          
            
              Task
              Commands
            
          
          
            
              View the latest skill catalog
              bpa skills list --detailed
            
            
              List the types of node for a plugin
              
                bpa knowledge plugins list <plugin>
                For example:
                bpa knowledge plugins list kubernetes
bpa knowledge plugins list aws
              
            
            
              Get details on a specific type of node 
              
                bpa knowledge plugins get <node_type>
                For example:
                bpa knowledge plugins get kubernetes dell.nodes.kubernetes.Deployment
bpa knowledge plugins get aws dell.nodes.aws.EC2Instances
              
            
            
              Search plugin documentation
              
                bpa knowledge docs search "search_topic_name"
bpa knowledge docs search "search_topic_name" --plugin hzp-storage
                For example:
                bpa knowledge docs search "helm chart deployment"
bpa knowledge docs search "powerstore volume" --plugin hzp-storage
              
            
            
              Find example blueprints
              
                bpa knowledge blueprints find "<keyword>"
bpa knowledge blueprints find "<keyword>"
                For example:
                bpa knowledge blueprints find "kubernetes helm"
bpa knowledge blueprints find "bare metal ubuntu"
              
            
            
              Search example blueprints by keyword
              
                bpa knowledge blueprints find "<query>"
              
            
          
        
      
    
  