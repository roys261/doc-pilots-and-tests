# Chapter 6: Operations

This chapter covers Day 2 operational procedures for VMware on Dell Private Cloud and VxRail, including node operations, cluster operations, service management, and integration management.

## Chapter Contents

### 6.1 Day 2 Operations Overview
Overview of Day 2 operations including:
- Operation types and scope
- Orchestration models (TOSCA vs state machine)
- Error handling and retry strategies
- Resumability and idempotency
- Lock-based concurrency

### 6.2 Node Operations
Detailed node operation procedures including:
- Node addition (VO and VX)
- Node reclaim (VO)
- Host removal (VX)
- Node commissioning (VCF)
- Node management (VCF)
- Operation validation and troubleshooting

### 6.3 Cluster Operations
Cluster operation procedures including:
- Cluster configuration changes
- Workload domain management (VCF)
- Cluster shutdown and power-on
- Cluster expansion
- Cluster validation

### 6.4 Service Management
Service management procedures including:
- Starting services
- Stopping services
- Restarting services
- Service health monitoring
- Service configuration updates

### 6.5 Integration Management
Integration management procedures including:
- vCenter integration
- Storage integration
- Dell backend integration
- SDDC Manager integration (VCF)
- Integration troubleshooting

## Key Operational Concepts

### Orchestration Models
- **TOSCA Blueprints (VO)**: DAP-driven orchestration with resumability
- **State Machine (VX)**: Phase-based orchestration with explicit transitions
- **Resumability**: Both models support operation resumption from failure points
- **Parallelism**: Blueprint parallelism vs limited state machine parallelism

### Error Handling
- **Validation Failures**: Fix input, re-submit (no automatic retry)
- **Transient Errors**: Re-run operation (resumes from failed step)
- **Partial Success**: Re-run with failed nodes only
- **Unrecoverable Errors**: Manual intervention required

### Operation Locking
- **Exclusive Locks**: Only one lifecycle operation per cluster
- **Conflict Detection**: Operations fail if lock is held
- **Lock Release**: Automatic on completion (success or failure)
- **Lock Information**: Current operation identifier provided on conflict

## Related Documentation

- <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\vo\day2-vo-node-cluster-operations-hld.md" />
- <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\vx\day2-vx-node-cluster-operations-hld.md" />
- <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\eng-reqs\ER-DAY2-004-ops-service-framework\ER-DAY2-004-ops-service-framework.md" />

---

**Previous Chapter**: [Security](../chapter-05-security/README.md) | **Next**: [Day 2 Operations Overview](01-day-2-operations-overview.md)
