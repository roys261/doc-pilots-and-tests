---
title: "Additional functionalities of Blueprint AI Assistant"
chapter: 9
topic: "Workflow wrappers"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "35-35"
---

# Workflow wrappers

Workflow wrappers are high-level commands that orchestrate multiple steps end-to-end, simplifying complex operations into
single commands.
Install wrapper
It performs the complete installation workflow:

1. Uploads the blueprint archive (.zip archives with loose files are auto-repacked with a wrapping directory).

2. Creates a deployment with provided inputs

3. Starts the installation workflow.

4. Tails the execution events in real-time (unless --no-tail )
The following is an example installation workflow:
dap-bpa install \
  --file blueprint.tar.gz \
  --blueprint-id my-blueprint \
  [--deployment-id my-dep] \
  [--inputs inputs.json] \
  [--no-tail]
Uninstall wrapper
It performs the complete uninstallation workflow:

1. Gets the deployment information.

2. Starts the uninstallation workflow.

3. Tails the execution events (unless --no-tail ).

4. Deletes the deployment.

5. Deletes the blueprint (unless --no-delete-blueprint ).
The following is an example uninstallation workflow:
dap-bpa uninstall <deployment_id> \
  [--no-delete-blueprint] \
  [--no-tail]
Benefits of using workflow wrappers

- Simplification: Combines multiple individual commands into one.

- Automation: Handles complete workflows automatically.

- Error Reduction: Less chance of manual errors in multi-step processes.

- Convenience: Perfect for common operations like installation and cleanup
The workflow wrappers are the recommended approach for most deployment scenarios as they significantly reduce the
complexity.
