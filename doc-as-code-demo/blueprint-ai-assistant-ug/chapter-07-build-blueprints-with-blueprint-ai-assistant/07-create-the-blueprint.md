
# Create the blueprint

Steps

1. In the AI agent window of your IDE, enter natural language prompts to create a blueprint using Blueprint AI Assistant .

2. The agent uses the dap skill to generate the blueprint.yaml  file.
Sample blueprint.yaml file:
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

3. For complex blueprints using multi-file  structure, create an inputs.yaml  and capabilities.yaml  files by
entering natural language prompts in the Blueprint AI Assistant window.
Sample inputs.yaml file:
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
Sample capabilities.yaml file:
capabilities:
  vm_ip:
    description: The VM IP address
    value: { get_attribute: [my_vm, ip] }

4. Validate the node templates.
a. To validate a specific node:
dap-bpa blueprint validate my_vm --file blueprint.yaml
b. To validate all the nodes:
dap-bpa blueprint validate-all --file blueprint.yaml

5. Create a sample deployment input file <example_JSON_config> /deployment-inputs.json .
Sample file:
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

6. Create a documentation README.md  file for the blueprint.
Sample README.md file:
# My Blueprint
## Overview
Description of what this blueprint deploys.
## Prerequisites
- vSphere 6.0+
- Appropriate templates
- Network configuration
## Usage
```bash
bpa orchestrator blueprints upload --file blueprint.yaml --id my-blueprint --revision
1.0.0
bpa orchestrator deployments create --blueprint-id my-blueprint --inputs
example_JSON_configs/deployment-inputs.json

7. Document all the parameters and their purpose in a CHANGELOG.yaml  file.
Sample CHANGELOG.yaml file:
**CHANGELOG.yaml:**
```yaml
1.0.0:
  - ticket: INITIAL
    developer: <Your_Name>
    description: Initial blueprint creation
