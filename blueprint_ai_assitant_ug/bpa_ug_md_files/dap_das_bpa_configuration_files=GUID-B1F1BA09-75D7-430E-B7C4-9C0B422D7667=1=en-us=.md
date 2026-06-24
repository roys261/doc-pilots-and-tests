# Configuration files
Use configuration files to store orchestrator credentials for automated workflows and
    CI/CD integration. 
    Orchestrator configuration is stored in the .devin/ directory. User level
      configuration is stored in ~/.devin/config.json, and project-level
      configuration is stored in .devin/config.json files.
    The configuration file uses JSON format with the following structure:
    {
  "orchestrators": {
    "default": {
      "url": "https://your-orchestrator.example.com",
      "tenant": "&lt;tenant-id&gt;",
      "username": "&lt;username&gt;",
      "password": "&lt;password-or-token&gt;",
      "trust_all": false
    }
  }
}
    You can configure multiple orchestrator profiles and switch between them using the
        --orchestrator or -o flag. Below is an example:
    {
  "orchestrators": {
    "production": {
      "url": "https://prod-orchestrator.example.com",
      "tenant": "&lt;prod-tenant-id&gt;",
      "username": "&lt;username&gt;",
      "password": "&lt;password&gt;"
    },
    "staging": {
      "url": "https://staging-orchestrator.example.com",
      "tenant": "&lt;staging-tenant-id&gt;",
      "username": "&lt;username&gt;",
      "password": "&lt;password&gt;"
    }
  }
  }
    Usage example:
    
      bpa orchestrator status --orchestrator production
      bpa orchestrator status -o staging
     
  