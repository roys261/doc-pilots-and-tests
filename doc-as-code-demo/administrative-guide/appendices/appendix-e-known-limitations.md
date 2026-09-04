# Appendix E: Known Limitations

## Product Limitations

### Deployment Type Immutability
**Limitation**: The deployment type (VO_VVF, VO_VCF, VX_VVF, VX_VCF) is immutable after Day 1 deployment and persisted in cluster state.

**Impact**: Cannot change deployment type without complete redeployment of the cluster.

**Workaround**: Carefully select the appropriate deployment type during initial deployment. Consider future requirements and growth plans.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-guidelines.md" />

### Horizontal Scaling Limitations
**Limitation**: All services run as single-replica deployments due to file-based state persistence requirements.

**Impact**: Cannot horizontally scale services for increased capacity or high availability.

**Workaround**: Monitor service capacity and plan for vertical scaling (larger VM resources) if needed.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\vo-vcf-product-hld.md" />

### Concurrent Operation Limitations
**Limitation**: Only one lifecycle operation can run at a time per cluster due to lock-based concurrency control.

**Impact**: Cannot run multiple lifecycle operations simultaneously (e.g., node add and upgrade).

**Workaround**: Plan operations sequentially. Use appropriate scheduling to avoid conflicts.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\vo\day2-vo-node-cluster-operations-hld.md" />

### vCenter Dependency
**Limitation**: Real-time dependency on vCenter Server availability for authentication (stateless auth proxy with no local cache).

**Impact**: Authentication fails if vCenter is unavailable, affecting all user operations.

**Workaround**: Ensure vCenter high availability, plan for vCenter maintenance windows, monitor vCenter health.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\security-hld.md" />

### Connected vs Disconnected Mode
**Limitation**: Some features require internet connectivity for full functionality in connected mode.

**Impact**: Reduced functionality in disconnected (air-gapped) environments, manual payload upload required.

**Workaround**: Plan for manual payload management in disconnected environments, ensure all required payloads are available.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vo.md" />

## Administrative Limitations

### Geographic Availability (VO)
**Limitation**: VMware on Dell Private Cloud (VO) has phased geographic rollout, excluding China and Federal markets initially.

**Impact**: Cannot deploy VO in excluded regions without explicit approval and availability.

**Workaround**: Use VxRail (VX) for global deployments including restricted markets.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vo.md" />

### Hardware Mixing Limitations
**Limitation**: Mixing different hardware platforms or generations within the same cluster is not supported.

**Impact**: Cannot mix different PowerEdge generations or combine VO and VX hardware in same cluster.

**Workaround**: Use consistent hardware platform within clusters. Plan hardware refreshes systematically.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vo.md" />

### Storage Configuration Limitations
**Limitation**: Only supported storage arrays and configurations are supported. Unsupported storage configurations may not work correctly.

**Impact**: Limited storage flexibility, must use Dell-integrated or Dell-compatible storage arrays.

**Workaround**: Use supported storage arrays and configurations. Refer to hardware compatibility list.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vo.md" />

### Custom Modifications
**Limitation**: Custom modifications to system configuration, unsupported configurations, or manual changes to managed components are not supported.

**Impact**: May void support, cause operational issues, prevent upgrades, or cause system instability.

**Workaround**: Follow supported configurations and procedures. Use supported APIs and interfaces for customizations.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\AGENTS.md" />

## VO-Specific Limitations

### Customer-Supplied Hardware
**Limitation**: VO requires customer-supplied PowerEdge servers and storage arrays.

**Impact**: Customer must manage hardware procurement, validation, and lifecycle.

**Workaround**: Plan hardware procurement and lifecycle management. Consider Dell support contracts for hardware.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vo.md" />

### Customer-Supplied Inputs
**Limitation**: VO requires customer-supplied iDRAC information and ESXi ISO images for deployment.

**Impact**: Additional preparation required for deployment, customer must manage input validation.

**Workaround**: Prepare all required inputs before deployment, validate inputs thoroughly.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\eng-reqs\ER-DAY1-001-cluster-deploy-vo-vvf\ER-DAY1-001-cluster-deploy-vo-vvf.md" />

### Storage Configuration Complexity
**Limitation**: Dell-compatible storage configuration may require manual intervention and validation.

**Impact**: Additional complexity for storage setup, potential for configuration errors.

**Workaround**: Use Dell-integrated storage (PowerStore) for automated configuration. Follow documentation carefully for compatible storage.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\vo-vcf-product-hld.md" />

### VCF Bringup Gate
**Limitation**: VO_VCF requires manual operator intervention at VCF Bringup Gate to drive VCF Installer UI.

**Impact**: Additional manual step in deployment process, requires operator availability.

**Workaround**: Plan for operator availability during deployment, understand VCF Installer process.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\vo-vcf-product-hld.md" />

## VX-Specific Limitations

### Appliance Hardware Lock-In
**Limitation**: VX requires VxRail-branded appliance hardware; standard PowerEdge servers are not supported.

**Impact**: Limited hardware flexibility, must use VxRail appliances for scaling and refresh.

**Workaround**: Plan hardware lifecycle using VxRail appliance refresh cycles.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vx.md" />

### vSAN Storage Limitation
**Limitation**: VX is limited to vSAN storage (VxRail-managed); external storage arrays are not supported.

**Impact**: Limited storage flexibility, storage scales with compute (appliance-based).

**Workaround**: Plan storage capacity with appliance scaling. Consider storage requirements carefully.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vx.md" />

### Legacy Upgrade Complexity
**Limitation**: Legacy upgrade support (8.x to 9.x) adds complexity to upgrade planning and execution.

**Impact**: More complex upgrade planning for older VxRail versions, potential for longer upgrade windows.

**Workaround**: Plan upgrades carefully, test upgrade procedures in non-production, allow adequate maintenance windows.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vx.md" />

## VCF-Specific Limitations

### FC Storage Requirement (VO_VCF)
**Limitation**: VO_VCF requires FC storage; iSCSI is not supported for VCF deployments.

**Impact**: Limited storage protocol options, requires FC infrastructure.

**Workaround**: Ensure FC infrastructure is available for VO_VCF deployments.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vo.md" />

### SDDC Manager Dependency
**Limitation**: VCF deployments require SDDC Manager and introduce additional complexity and dependencies.

**Impact**: Additional management layer, more complex operations, additional failure points.

**Workaround**: Plan for SDDC Manager high availability, understand SDDC Manager operations and limitations.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\vo-vcf-product-hld.md" />

### VCF-Specific Operations
**Limitation**: VCF requires specific operations (host commissioning, workload domain management) that add complexity.

**Impact**: Additional operational procedures, requires VCF-specific knowledge and training.

**Workaround**: Ensure administrators are trained on VCF operations, follow VCF-specific procedures.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\vo\day2-vo-node-cluster-operations-hld.md" />

## Upgrade Limitations

### Upgrade Complexity
**Limitation**: Upgrades require careful planning, validation, and can be complex and time-consuming.

**Impact**: Longer maintenance windows, potential for upgrade failures, requires careful coordination.

**Workaround**: Follow upgrade procedures carefully, test in non-production, plan adequate maintenance windows, ensure rollback capability.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\eng-reqs\ER-LCM-012-vlcm-integration\ER-LCM-012-vlcm-integration.md" />

### Multi-Hop Upgrade Requirements
**Limitation**: Some upgrades require intermediate versions (multi-hop upgrades) rather than direct upgrades.

**Impact**: Longer upgrade processes, multiple maintenance windows, increased complexity.

**Workaround**: Plan upgrade paths carefully, allow adequate time for multi-hop upgrades, test each hop.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vo.md" />

### Parallel Remediation Limitations
**Limitation**: Parallel remediation is only supported for VO_VVF; other deployment types have limited or no parallel remediation.

**Impact**: Longer upgrade times for VX and VCF deployments, less flexibility for upgrade optimization.

**Workaround**: Plan for longer upgrade windows for non-VO_VVF deployments, optimize other aspects of upgrade process.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vo.md" />

## Security Limitations

### Real-Time Authentication Dependency
**Limitation**: Stateless authentication with real-time validation adds latency to every request and depends on vCenter availability.

**Impact**: Authentication latency, dependency on vCenter availability, no authentication during vCenter outages.

**Workaround**: Ensure vCenter high availability, monitor authentication performance, plan for vCenter maintenance.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\security-hld.md" />

### Credential Rotation Complexity
**Limitation**: Credential rotation requires coordination across multiple systems and services.

**Impact**: Complex credential rotation procedures, potential for service disruption if not coordinated properly.

**Workaround**: Plan credential rotations carefully, test rotation procedures, use maintenance windows for credential changes.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\eng-reqs\ER-SEC-001-credential-sync-detection\ER-SEC-001-credential-sync-detection.md" />

### Certificate Management Complexity
**Limitation**: Certificate management across multiple components requires coordination and planning.

**Impact**: Complex certificate lifecycle management, potential for service disruption if certificates expire.

**Workaround**: Implement certificate lifecycle management, monitor certificate expiration, plan certificate rotations.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\security-hld.md" />

## Monitoring and Serviceability Limitations

### Event Pipeline Saturation
**Limitation**: Event pipeline can become saturated during high event volumes, potentially causing event loss or delays.

**Impact**: Event processing delays, potential event loss, delayed alerting.

**Workaround**: Monitor event pipeline throughput, implement event throttling, ensure adequate resources for event processing.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\s12y-hld.md" />

### Telemetry Upload Failures
**Limitation**: Telemetry upload may fail in disconnected environments or during connectivity issues.

**Impact**: Loss of telemetry data, reduced visibility into system health and usage.

**Workaround**: Monitor telemetry upload status, implement retry logic, plan for manual telemetry collection in disconnected environments.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\eng-reqs\ER-S12Y-004-telemetry\ER-S12Y-004-telemetry.md" />

### Log Collection Scope
**Limitation**: Log collection may not capture all relevant logs or may have size limitations.

**Impact**: Incomplete diagnostic information, potential for missing critical log data during troubleshooting.

**Workaround**: Configure log collection appropriately, monitor log collection status, implement supplemental log collection if needed.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\eng-reqs\ER-S12Y-003-log-bundles\ER-S12Y-003-log-bundles.md" />

## Network Limitations

### Network Configuration Complexity
**Limitation**: Network configuration requires proper VLAN setup, MTU configuration, and network infrastructure support.

**Impact**: Complex network setup, potential for misconfiguration, network performance issues if not configured correctly.

**Workaround**: Follow network configuration guidelines carefully, validate network configuration, test network performance.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\vo\day2-vo-node-cluster-operations-hld.md" />

### MTU Consistency Requirements
**Limitation**: MTU configuration must be consistent across all network components for optimal performance.

**Impact**: Network performance issues if MTU is inconsistent, potential for packet loss or fragmentation.

**Workaround**: Ensure MTU consistency across all network components, test network performance after MTU changes.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\vo\day2-vo-node-cluster-operations-hld.md" />

## Operational Limitations

### Blueprint Resumability Scope
**Limitation**: Blueprint resumability applies to blueprint-driven operations but may not cover all failure scenarios.

**Impact**: Some failures may require manual intervention or cannot be resumed automatically.

**Workaround**: Understand resumability scope, plan for manual intervention for non-resumable failures.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\vo\day2-vo-node-cluster-operations-hld.md" />

### Partial Failure Handling
**Limitation**: Multi-node operations may experience partial failures where some nodes succeed and others fail.

**Impact**: Complex failure handling, requires re-running operations with failed nodes only.

**Workaround**: Monitor multi-node operations carefully, be prepared to re-run with failed nodes, understand partial failure handling procedures.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\vo\day2-vo-node-cluster-operations-hld.md" />

### Configuration Drift
**Limitation**: Manual configuration changes outside of supported procedures may cause configuration drift.

**Impact**: Configuration inconsistencies, potential for operational issues, upgrade failures.

**Workaround**: Follow supported configuration procedures, avoid manual changes, monitor for configuration drift.

**Related**: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\AGENTS.md" />

## Risks and Considerations

### Upgrade Risks
**Risk**: Upgrade failures may require rollback or manual intervention, potentially causing extended downtime.

**Mitigation**: Pre-upgrade validation, comprehensive testing in non-production, backup procedures, rollback planning.

**Consideration**: Plan for potential downtime during upgrades, communicate upgrade schedules to stakeholders.

### Security Risks
**Risk**: Security vulnerabilities if not properly managed, credentials compromised, certificates expired.

**Mitigation**: Regular security updates, security monitoring, following security best practices, regular credential and certificate rotation.

**Consideration**: Implement defense-in-depth security strategy, regular security audits, compliance monitoring.

### Operational Risks
**Risk**: Operational errors may cause system issues, configuration errors, service disruptions.

**Mitigation**: Change management, administrator training, documentation, testing procedures, approval processes.

**Consideration**: Implement operational procedures and guidelines, regular training, documentation maintenance.

### Hardware Risks
**Risk**: Hardware failures may cause service disruptions, data loss, or system unavailability.

**Mitigation**: Redundant hardware, monitoring, proactive replacement, backup procedures.

**Consideration**: Plan for hardware failures, implement monitoring and alerting, maintain spare hardware inventory.

### Dependency Risks
**Risk**: Dependencies on external systems (vCenter, storage arrays, Dell backend) may cause service disruptions.

**Mitigation**: High availability for external systems, monitoring, dependency management, contingency planning.

**Consideration**: Understand system dependencies, plan for external system outages, implement alternative procedures.

---

**Previous**: [Glossary](appendix-d-glossary.md) | **Back to Guide Contents**: [README](../README.md)
