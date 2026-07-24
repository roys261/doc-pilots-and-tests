---
title: "Blueprints and plugins"
chapter: 6
topic: "Blueprint file structure"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "24-23"
---

# Blueprint file structure

Based on your specific use case, blueprints can have a simple or complex file structure.
Simple blueprint (single file)
my-blueprint/
├── blueprint.yaml
├── example_JSON_configs/
│ └── deployment-inputs.json
├── CHANGELOG.yaml
├── README.md
└── icon.png
Complex blueprint (multiple file):
my-blueprint/
├── blueprint.yaml # Main blueprint with imports
├── inputs.yaml # Input definitions
├── capabilities.yaml # Output definitions
├── infrastructure/
│ └── vsphere/
│ ├── inputs.yaml
│ ├── definitions.yaml
│ └── outputs.yaml
├── example_JSON_configs/
│ ├── deployment-inputs.json
│ └── example-configs-*.json
├── CHANGELOG.yaml
├── README.md
└── icon.png
