# SSL certificate configuration
When you are facing SSL certificate errors (such as self-signed certificates,
    development setups, or corporate proxies), you can use various methods to bypass or work around
    verification issues.
    
      SSL certificate methods
      SSL certificate methods
      
        
        
        
        
          
            Method
            Usage example
            Scope
          
        
        
          
            --trust-all
            
              bpa orchestrator blueprints list -o <orchestrator_name> --trust-all
            
            Single command
          
          
            --skip-ssl-verify
            
              bpa orchestrator blueprints list -o <orchestrator_name> --skip-ssl-verify
            
            Single command
          
          
            --insecure
            
              bpa orchestrator blueprints list -o <orchestrator_name> --insecure
            
            Single command
          
          
            NODE_TLS_REJECT_UNAUTHORIZED=0
            
              NODE_TLS_REJECT_UNAUTHORIZED=0 bpa orchestrator blueprints list
            
            Command/session
          
          
            Configuration based
            Set ssl_verify: false in the
                ~/.blueprint-assist/config.json
              file{
  "orchestrators": {
    "<orchestrator_name>": {
      "ssl_verify": false,
      "skip_ssl_verification": true
    }
  }
}
            Global for profile
          
        
      
    
    The SSL validation bypass methods are applicable only when you are
      working in development environments. 
	 For production environments with valid SSL certificates, ensure that the SSL verification is
      enables by default.
    {
  "ssl_verify": true,
  "skip_ssl_verification": false
} 
  