# Setup the certificates
This section explains how to configure certificate trust for development and production
		environments. 
	  
	 	
	 		Log in using the --trust-all flag (development only)
	 		
	 			For development environments with self-signed certificates, use the --trust-all flag:
	 			bpa orchestrator login --url https://your-orchestrator.example.com --tenant <tenant-id> --trust-all
	 			 The --trust-all flag should only be used in development
						environments. It bypasses SSL certificate validation and introduces security
						risks. 
	 		
	 	
	 	
	 	
				For production environments with custom CA certificates, configure the
					certificate trust store:
				
					
						Obtain the CA certificate from your orchestrator.
					
					
						Add the certificate to the trust store of your system.
					
					
						Verify the connection using bpa orchestrator
							status.
					
				
			
	 	
	  
  