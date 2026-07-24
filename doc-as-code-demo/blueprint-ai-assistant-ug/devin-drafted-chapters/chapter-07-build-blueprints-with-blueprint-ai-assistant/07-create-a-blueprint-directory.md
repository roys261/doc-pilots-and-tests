---
title: "Build blueprints with Blueprint AI Assistant"
chapter: 7
topic: "Create a blueprint directory"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "27-26"
---

# Create a blueprint directory

To create a blueprint directory, you can either use natural language prompts in Blueprint AI Assistant or CLI commands in your
IDE terminal. This section provides the commands to create the directory from the terminal.
Steps

1. Create your blueprint directory.
mkdir <blueprint-name>
cd <blueprint-name>

2. Create a standard structure.
mkdir -p infrastructure/ <outcome_name>
mkdir -p <example_JSON_configs>
