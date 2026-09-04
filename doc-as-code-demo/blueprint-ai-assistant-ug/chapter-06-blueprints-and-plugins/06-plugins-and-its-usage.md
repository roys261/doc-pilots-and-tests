
# Plugins and its usage

Dell Automation Platform uses a plugin-based architecture, where each type of infrastructure relies on a corresponding plugin to
provide its specific functionality.
How plugins work with the Dell Automation Platform orchestrator and
blueprints

1. Infrastructure abstraction:

- Each infrastructure platform has different APIs, management interfaces, and operational models.

- Plugins provide a standardized TOSCA interface over these platform-specific differences.

- A plugin translates TOSCA node types into platform-specific API calls.

2. Node-type usage:

- Plugins provide the node-type that the blueprints use to define infrastructure resources.

- Node-types are namespaced as dell.nodes. <plugin> .<Type> . For example: dell.nodes.vsphere.Server ,
dell.nodes.kubernetes.Pod

- Without the correct plugin, the orchestrator cannot interpret or run the node type.

3. Blueprint dependencies: Blueprints declare plugin dependencies in the imports  section. For example:
imports:
  - dell/types/types.yaml
  - plugin:vsphere-plugin?version= >=3.0.7.0,<4.0.0.0
  - plugin:ansible-plugin?version= >=4.1.8.0,<5.0.0.0

4. Orchestrator validation: The Dell Automation Platform orchestrator  validates blueprints against plugin schemas and requires
the plugins to be installed.
What happens without plugins
If a plugin is missing from the Dell Automation Platform orchestrator , it can trigger the following failures:

Table 5. Failure descriptions
Failure type Description
Upload failure The orchestrator rejects blueprint uploads that reference unavailable plugins.
Execution failure Deployment workflows fail when they encounter node-types from missing plugins.
Validation failure The orchestrator cannot validate blueprint structure without plugin schemas.
Learn more about the plugins
You can use prompts in natural language in the Blueprint AI Assistant to learn and understand about the available plugins.
Alternatively, you can also enter CLI commands in your IDE terminal.
The following are some commands to learn about the available plugins:

- See all the available plugins:
dap-bpa orchestrator plugins list

- Explore a plugin for a specific node-type:
dap-bpa knowledge plugins list <node-type>

- Get the detailed documentation:
dap-bpa knowledge plugins docs <node-type>

- Search for a specific functionality:
dap-bpa knowledge docs search "volume" --plugin storage
