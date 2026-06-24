# Automated lifecycle testing with bpa
      monitor (v0.24.0+)
Blueprint AI Assistant is capable of automated lifecycle testing.
    It requires an active Dell Automation Platform orchestrator
    connection as it uploads, deploys, and runs your blueprint against real
    infrastructure. 
	 
      The bpa monitor command automates the complete blueprint lifecycle for
        testing and validation by performing the following steps:
      
        Upload the blueprint to the Dell Automation Platform
            orchestrator (idempotent)
        Create deployment from provided inputs
        Run the install workflow and poll to completion
        Run any additional workflows
        Validate assertions against outputs
        Run the uninstall workflow unless --keep is set
        Clean up the deployment and blueprint
      
      A sample command:
      
bpa monitor <blueprint_name>/ \
  --inputs '{"vm_name": "test-vm", "network": "default"}' \
  --workflow install \
  --assert 'vm_ip=192.168.*' \
  --keep
      The output contains:
      
        Structured JSON (stdout): Machine-consumable for AI agents and CI pipelines 
        Human-readable report (stderr or --report
          file)
        Real-time progress with live terminal updates during execution
      
    
    
      bpa monitor flag reference
      
        Flag reference
        Flag reference
        
          
          
          
            
              Flag
              Purpose
            
          
          
            
              --inputs '<json>'
              Supply deployment inputs inline
            
            
              --workflow <name>
              Specify which workflow to run
            
            
              --assert 'key=regex'
              Validate outputs against regex assertions
            
            
              --keep
              Preserve resources after the run for debugging
            
            
              --detach
              Return immediately (default: attached mode)
            
            
              --timeout <duration>
              Set a timeout for the operation
            
            
              --poll-interval <seconds>
              How often to poll status (default: 10 s)
            
            
              --max-retries <n>
              Number of diagnostician repair attempts
            
            
              --status
              Show status of most recent session
            
            
              --daemon-status
              Show whether the background daemon is running
            
            
              --daemon-stop
              Stop the background daemon
            
          
        
      
    
    
      Prerequisites for using bpa monitor command
      
        Verify the Dell Automation Platform orchestrator is
          configured and reachable using the command bpa status.
        LLM credentials are configured using the bpa setup command. It is
          required for the auto-repair diagnostician.
        Blueprint linted and validated locally before
          running:bpa blueprint lint --file <blueprint_name>/blueprint.yaml --verify
bpa blueprint validate-all --file <blueprint_name>/blueprint.yaml
      
     
  