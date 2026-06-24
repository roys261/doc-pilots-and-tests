# Blueprint file structure
Based on the complexity, choose between a structure. 
	  
		Simple blueprint (single file)
      
my-blueprint/
├── blueprint.yaml
├── example_JSON_configs/
│   └── deployment-inputs.json
├── CHANGELOG.yaml
├── README.md
└── icon.png 
	 
    
      Complex blueprint (multiple
        file):
      
my-blueprint/
├── blueprint.yaml              # Main blueprint with imports
├── inputs.yaml                 # Input definitions
├── capabilities.yaml           # Output definitions
├── infrastructure/
│   └── vsphere/
│       ├── inputs.yaml
│       ├── definitions.yaml
│       └── outputs.yaml
├── example_JSON_configs/
│   ├── deployment-inputs.json
│   └── example-configs-*.json
├── CHANGELOG.yaml
├── README.md
└── icon.png
     
  