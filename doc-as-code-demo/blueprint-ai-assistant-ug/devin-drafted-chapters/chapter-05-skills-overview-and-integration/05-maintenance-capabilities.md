---
title: "Skills overview and integration"
chapter: 5
topic: "Maintenance capabilities"
source: "Blueprint AI Assistant with Dell Automation Studio User Guide (July 2026, Rev. A00) and the Blueprint Assist Training repository"
pdf_pages: "20-21"
---

# Maintenance capabilities

Drift detection
Skill: dap-deployment-update
CLI commands: Blueprint structure with check_drift , update , postupdate operations
Skills guide you to add a node template structure. The following is an example:
node_templates:
  vm:
    type: dell.nodes.vsphere.Server
    interfaces:
      dell.interfaces.lifecycle:
        check_drift:
          implementation: scripts/check_drift.py
          inputs:
            expected_cpus: { get_input: vm_cpus }
        update:
          implementation: scripts/update_vm.py
        postupdate:
          implementation: scripts/verify_vm.py
Key features:

- check_drift : Read-only comparison between live and required state

- update : Idempotent drift correction

- postupdate : Post-change verification

- Drift information stored in system_properties["configuration_drift"]
Update support
Skill: dap-deployment-update
CLI commands: dap-bpa orchestrator deployment-updates
The following is a sample deployment update workflow that the skill triggers:
dap-bpa orchestrator blueprints upload --file blueprint.yaml --id my-bp --revision v2.1.0
cat > update-body.json << 'EOF'
{
  "blueprint_id": "my-bp",
  "blueprint_version": "v2.1.0",
  "skip_reinstall": true
}
EOF
dap-bpa orchestrator deployment-updates initiate my-deployment --body update-body.json
Key features:

- Blueprint version bumps

- Input changes

- Node additions or removals

- Relationship modifications

- Preview or dry-run mode

- Selective reinstall control
Version management
Skills: dap, dap-deployment-update
CLI commands: dap-bpa orchestrator
The skills trigger these CLI commands for version management:
dap-bpa orchestrator blueprints upload --file blueprint.yaml --id my-bp --revision v1.0.0
dap-bpa orchestrator blueprints get my-bp --fields id state revisions
Key features:

- Semantic versioning ( semver )

- Revision tracking

- CHANGELOG.yaml documentation

- Blueprint state management
Rollback procedures
Skill: dap-deployment-update
CLI commands: dap-bpa orchestrator deployment-updates
Skills trigger rollback using deployment update to previous version:
cat > rollback-body.json << 'EOF'
{
  "blueprint_id": "my-bp",
  "blueprint_version": "v1.1.0"
}
EOF
dap-bpa orchestrator deployment-updates initiate my-deployment --body rollback-body.json
Key features:

- Version rollback (deployment update to previous revision)

- Input rollback (revert to previous input values)

- Manual rollback (delete and redeploy)
Limitations: No automated rollback triggers, point-in-time recovery, or rollback testing framework
