# Authoring capabilities

    
      Create blueprints
      Skills: dap, dap-scripts,
          dap-service-composition
      CLI commands: dap-bpa knowledge, dap-bpa blueprint
      Skills trigger these CLI commands for research:
      
        Search for existing blueprints as
          reference:dap-bpa knowledge blueprints find "<query>"
        Search the node types for required the
          plugins:
dap-bpa knowledge plugins list <plugin>
dap-bpa knowledge plugins get <plugin> <node_type>
      
    
    
      Edit existing blueprints
      Skills: dap, dap-scripts,
          dap-deployment-update
      CLI commands: dap-bpa knowledge, dap-bpa blueprint
      The skills trigger the following CLI commands for analysis and validation:
      
        Read existing
          blueprint:dap-bpa knowledge blueprints get <id> --include-files
        Lint the blueprint before
          editing:dap-bpa blueprint lint --file blueprint.yaml --verify
        Make the changes manually or AI-assisted.
        Re-lint the blueprint after the changes are
          complete:dap-bpa blueprint lint --file blueprint.yaml --verify
      
    
    
      Validate blueprints
      Skill: dap
      CLI Commands: dap-bpa blueprint lint, dap-bpa blueprint
          validate
      Skills trigger this two-stage validation process:
      dap-bpa blueprint lint --file blueprint.yaml --verify
dap-bpa blueprint validate-all --file blueprint.yaml
      Key features:
      
        Lint validation (DSL compliance, structure, inputs, secrets, lifecycle)
        Schema validation (node type properties, required fields, type constraints)
        Comprehensive error reporting
      
    
    
      Generate inputs or outputs
      Skill: dap
      Input generation:
      
        Type support: string, integer, float,
            boolean, list, dict,
            textarea
        Constraint types: valid_values, pattern,
            min_length, max_length, in_range
        Input grouping for UI organization
        Conditional visibility with only_with
      
      Output generation:
      
        Capability-based outputs 
        Intrinsic function support: get_attribute,
            get_property, get_input
        Secret handling capabilities
      
     
  