---
title: "Skills overview and integration"
chapter: 5
topic: "Task-specific commands"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "22-23"
---

# Task-specific commands

If you choose not to use prompts to invoke skills, you can alternatively use CLI commands in your IDE terminal to perform
specific tasks.

Table 4. Commands to perform specific tasks
Task CLI commands
View the latest skill catalog dap-bpa skills list --detailed
List the types of node for a plugin dap-bpa knowledge plugins list <plugin>
For example:
dap-bpa knowledge plugins list kubernetes
dap-bpa knowledge plugins list aws
Get details on a specific type of node dap-bpa knowledge plugins get <node_type>
For example:
dap-bpa knowledge plugins get kubernetes
dell.nodes.kubernetes.Deploymentdap-
bpa knowledge plugins get aws dell.nodes.aws.EC2Instances
Search plugin documentation dap-bpa knowledge docs search " search_topic_name "
dap-bpa knowledge docs search " search_topic_name " --plugin
hzp-storage
For example:
dap-bpa knowledge docs search "helm chart deployment"
dap-bpa knowledge docs search "powerstore volume" --plugin
hzp-storage
Find example blueprints dap-bpa knowledge blueprints find " <keyword> "
dap-bpa knowledge blueprints find " <keyword> "

Table 4. Commands to perform specific tasks (continued)
Task CLI commands
For example:
dap-bpa knowledge blueprints find "kubernetes helm"
dap-bpa knowledge blueprints find "bare metal ubuntu"
Search example blueprints by
keyword dap-bpa knowledge blueprints find " <query> "
