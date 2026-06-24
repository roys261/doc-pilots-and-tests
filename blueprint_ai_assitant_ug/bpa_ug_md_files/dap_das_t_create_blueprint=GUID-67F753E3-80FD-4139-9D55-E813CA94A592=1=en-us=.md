# Create the blueprint
 
	  
		
				Create the main blueprint file blueprint.yaml by following
					TOSCA standards:
				
					
tosca_definitions_version: dell_1_1

description: >
  Your blueprint description here

imports:
  - dell/types/types.yaml
  - plugin:vsphere-plugin?version= >=3.0.7.0,<4.0.0.0

dsl_definitions:
  connection_config: &connection_config
    username: { get_input: vsphere_username }
    password: { get_secret: { get_input: vsphere_secret } }
    host: { get_input: vsphere_host }
    port: { get_input: vsphere_port }

inputs:
  # Define your inputs here
  vsphere_host:
    type: string
    hidden: false
    allow_update: false
    display_label: vSphere Host
    description: The vSphere server hostname or IP address.
    display:
      group: connection
      index: 0

  # ... more inputs

input_groups:
  connection:
    display_label: vSphere Connection
    collapsible: true
    index: 0
    inputs:
      - vsphere_host
      # ... more inputs

node_templates:
  # Define your node templates here
  my_vm:
    type: dell.nodes.vsphere.Server
    properties:
      connection_config: *connection_config
      # ... more properties

capabilities:
  # Define your capabilities here
  vm_ip:
    description: The VM IP address
    value: { get_attribute: [my_vm, ip] }

labels:
  csys-obj-type:
    values:
      - environment

blueprint_labels:
  obj-type:
    values:
      - vsphere
				
			 
		
				For complex blueprints using multi-file structure, create
						inputs.yaml file.
				
					
inputs:
  vsphere_host:
    type: string
    hidden: false
    allow_update: false
    display_label: vSphere Host
    description: The vSphere server hostname or IP address.
    display:
      group: connection
      index: 0
				
			
			
				For complex blueprints using multi-file structure, create
					a capabilities.yaml file.
				
					
capabilities:
  vm_ip:
    description: The VM IP address
    value: { get_attribute: [my_vm, ip] }
				
			
			
				Before uploading, lint the blueprint.
				
					Basic linting:
					bpa blueprint lint --file blueprint.yaml
					Lint with a zero-byte file check:
					bpa blueprint lint --file blueprint.yaml --verify
					Lint and generate false-positive report:
					bpa blueprint lint --file blueprint.yaml --report-fp
				
			
			
				Validate the node templates.
				
					
						To validate a specific node:
						
							bpa blueprint validate my_vm --file blueprint.yaml
						
					
					
						To validate all the nodes:
						
							bpa blueprint validate-all --file blueprint.yaml
						
					
				
			
			
				Create a sample deployment input file
							<example_JSON_config>/deployment-inputs.json.
				
					
{
  "vsphere_host": "vcenter.example.com",
  "vsphere_port": 443,
  "vsphere_username": "administrator@vsphere.local",
  "vsphere_secret": "vsphere_password_secret",
  "vm_name": "my-vm",
  "template_name": "Ubuntu-Template",
  "vm_cpus": 2,
  "vm_memory": 4096,
  "vm_disk_size": 60
}
				
			
			
				Create the documentation file README.md for the
					blueprint.
				Sample README.md
					file:
# My Blueprint

## Overview
Description of what this blueprint deploys.

## Prerequisites
- vSphere 6.0+
- Appropriate templates
- Network configuration

## Usage
```bash
bpa orchestrator blueprints upload --file blueprint.yaml --id my-blueprint --revision 1.0.0
bpa orchestrator deployments create --blueprint-id my-blueprint --inputs example_JSON_configs/deployment-inputs.json
			
			
				Document all the parameters and their purpose.
				Sample CHANGELOG.yaml
          file:
**CHANGELOG.yaml:**
```yaml
1.0.0:
  - ticket: INITIAL
    developer: <Your_Name>
    description: Initial blueprint creation
			 
	  
  