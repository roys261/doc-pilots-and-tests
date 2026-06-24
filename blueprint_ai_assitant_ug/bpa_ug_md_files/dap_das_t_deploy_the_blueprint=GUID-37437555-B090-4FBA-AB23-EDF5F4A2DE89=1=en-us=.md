# Deploy the blueprint

		To deploy custom blueprints, you must have a valid Dell Automation Studio license. 
	  
		
				Upload the blueprint to the orchestrator.
				
					bpa orchestrator blueprints upload \
  --file blueprint.yaml \
  --id <blueprint_name> \
  --revision 1.0.0
				
			 
		
				Check the upload status.
				
					bpa orchestrator blueprints get <blueprint_name>
				
			
			
				Create the deployment with inputs.
				
					
bpa orchestrator deployments create \
  --blueprint-id <blueprint_name> \
  --inputs <example_JSON_configs>/deployment-inputs.json \
  --display-name "<deployment_name>"
				
			
			
				List the deployments.
				
					bpa orchestrator deployments list
				
			
			
				Perform the installation.
				
					
						Start the install workflow.
						
							bpa orchestrator executions start <deployment_id> --workflow-id install
						
					
					
						Monitor the deployment.
						
							bpa orchestrator executions get <execution_id>
						
					
					
						View the events.
						
							bpa orchestrator events get <execution_id>
						
					
				
			 
	  
  