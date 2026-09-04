# VMware on Dell Private Cloud (VO)

## Overview

VMware on Dell Private Cloud is Dell's disaggregated hardware platform that enables deployment, management, and operation of VMware software platforms on standard Dell PowerEdge servers and Dell storage arrays. Unlike appliance-based models, it decouples hardware procurement from software licensing, supporting Bring-Your-Own-Subscription (BYOS) licensing.

Source: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\product-vo.md" />

## Architecture

### Disaggregated Model
The disaggregated architecture provides:
- **Independent Scaling**: Compute, storage, and software can be scaled independently
- **Hardware Flexibility**: Use standard Dell PowerEdge servers and Dell storage arrays
- **Licensing Flexibility**: Bring-Your-Own-Subscription (BYOS) VMware licensing
- **Investment Protection**: Ability to reuse existing PowerEdge infrastructure

### Hardware Components
- **Compute**: Dell PowerEdge servers
  - 16G: R660, R760
  - 17G: R670, R770, R6715, R6725, R7715, R7725
- **Storage**: Dell PowerStore arrays
  - VO_VVF: FC or iSCSI
  - VO_VCF: FC only
  - Dell-compatible storage arrays also supported

### Software Platform Support
VO supports two VMware platforms:
- **VMware vSphere Foundation (VVF)**: ESXi and vCenter
- **VMware Cloud Foundation (VCF)**: ESXi, vCenter, SDDC Manager, NSX, VCF Operations, VCF Automation

## Deployment Types

### VO_VVF: VMware vSphere on Dell Private Cloud

**Components**
- ESX/ESXi hosts
- vCenter Server (DPC-deployed or customer-deployed)
- Dell Private Cloud Manager
- PowerStore or compatible storage

**Storage Options**
- Dell-integrated storage: PowerStore over FC or iSCSI
- Dell-compatible storage: Supported arrays and protocols

**Key Features**
- TOSCA blueprint-driven cluster deployment
- Node addition (1-8 nodes per operation)
- Node reclaim
- vLCM-based lifecycle management
- Parallel remediation support (VO_VVF only)
- Pause and resume during upgrades (VO_VVF only)

**Use Cases**
- Enterprise customers seeking licensing flexibility
- CSPs and MSPs previously unreachable by appliance models
- Organizations with existing PowerEdge infrastructure
- Cost-sensitive deployments with BYOS licensing

### VO_VCF: VMware Cloud Foundation on Dell Private Cloud

**Components**
- ESX/ESXi hosts
- vCenter Server (customer-deployed via VCF Installer)
- SDDC Manager
- NSX
- VCF Operations and VCF Automation
- Dell Private Cloud Manager
- PowerStore or compatible storage

**Storage Options**
- Dell-integrated storage: PowerStore over FC
- Dell-compatible storage: Supported arrays and protocols

**Key Features**
- VCF Installer deployment and bringup
- Management domain and workload domain support
- Host commissioning into SDDC Manager free pool
- Cluster management for workload domains
- SDDC Manager-delegated lifecycle management
- VCF-specific validation and operations

**Use Cases**
- Enterprise customers requiring VCF capabilities
- Organizations needing management and workload domain separation
- Multi-tenant environments
- Advanced VMware platform features

## Management Plane

### Dell Private Cloud Manager
- **Deployment**: Virtual Machine with Kubernetes cluster
- **Services**: Day 1, Day 2, LCM, Serviceability, Security services
- **Orchestration**: TOSCA blueprints via DAP Orchestrator
- **UI**: DPC Extension (vSphere Client remote plugin)

### DAP Orchestrator
- **Purpose**: Execute TOSCA blueprints for provisioning and Day 2 operations
- **Capabilities**: Resumability, parallelism, consistent error reporting
- **Integration**: Dell Automation Platform for workflow orchestration

## Key Features

### Bare-Metal Onboarding and Provisioning
- Customer-supplied iDRAC information
- Customer-supplied ESXi ISO images
- Input validation and hardware checks
- Firmware updates to certified levels
- ESXi imaging and configuration
- DPC Manager VM deployment

### Cluster Deployment
- TOSCA blueprint-driven orchestration
- Fail-fast validation at each phase
- Per-node failure isolation
- Storage configuration (automated for PowerStore, manual pause for compatible)
- VCF Installer deployment (VO_VCF)
- VCF Bringup Gate (VO_VCF)

### Node Operations
- **Node Addition**: Add 1-8 new nodes with blueprint workflow
- **Node Reclaim**: Remove nodes with cleanup and factory reset
- **Host Commissioning** (VO_VCF): Add hosts to SDDC Manager free pool
- **Node Management** (VO_VCF): Onboard commissioned hosts
- **Cluster Management** (VO_VCF): Workload domain cluster operations

### Lifecycle Management
- Hub-and-spoke upgrade orchestration
- vLCM integration for ESXi and firmware updates
- Compose target state with dependency resolution
- Pre-checks with Service Data Bundle (SDB)
- Update Advisor reporting
- Compliance reporting against KGS baseline
- Custom component support (GPU, HBA)
- Connected and disconnected mode parity

### Serviceability
- **Event Pipeline**: Three-stage processing (Transformer, Doctor, Distributor)
- **Telemetry**: Scheduled collection with retry logic
- **Log Bundles**: Multi-source parallel collection
- **Remote Connectivity**: Via DAP Orchestrator and DPC Agent
- **eServices**: Proxy configuration and Dell Support integration

## Target Customers

### Primary Markets
- **Enterprise Customers**: Seeking VMware HCI-like experience with licensing flexibility
- **Cloud Service Providers (CSPs)**: Previously unreachable by appliance restrictions
- **Managed Service Providers (MSPs)**: Need flexible licensing and hardware portability
- **Strategic Accounts**: Investment protection from VMware/Broadcom changes
- **Channel Partners**: VARs, DMRs, distributors, system integrators

### Industry Verticals
- Financial Services
- Healthcare
- Manufacturing
- Telecommunications
- Energy
- Public Sector (state/local)

### Geographic Availability
- **Phase 1**: Americas + core EMEA (US, Canada, major EU countries)
- **Phase 2**: Extended EMEA + APJ (China excluded)
- **Phase 3**: LATAM, Federal/SLED, remaining regions

## Benefits

### Business Benefits
- **Licensing Flexibility**: BYOS model reduces software costs
- **Hardware Portability**: Reuse existing PowerEdge infrastructure
- **Market Expansion**: Reach CSPs and MSPs previously unreachable
- **Investment Protection**: Future compatibility with Dell Solutions Platform
- **Speed to Market**: Shift-left qualifications using existing PowerEdge qual

### Technical Benefits
- **Independent Scaling**: Scale compute, storage, and software independently
- **Flexible Storage**: Choice of Dell-integrated or compatible storage
- **Modern Orchestration**: TOSCA blueprint-driven automation
- **Comprehensive Management**: Full lifecycle management capabilities
- **Serviceability**: Advanced monitoring, logging, and support integration

### Operational Benefits
- **Day 2 Automation**: Automated node operations and lifecycle management
- **Resumability**: Blueprint operations resume from failure points
- **Parallel Operations**: Parallel remediation reduces upgrade time
- **Connected/Disconnected**: Full capability parity in air-gapped environments
- **Integrated Support**: Dell backend integration for proactive support

## Considerations

### Deployment Considerations
- **Deployment Type Immutability**: Cannot change deployment type after Day 1
- **Customer-Supplied Hardware**: Customer provides and manages hardware
- **Customer-Supplied Inputs**: iDRAC information and ESXi images required
- **Storage Configuration**: May require manual configuration for compatible storage

### Operational Considerations
- **vCenter Dependency**: Real-time dependency on vCenter for authentication
- **DAP Orchestrator**: Required for blueprint execution
- **Network Requirements**: Proper network infrastructure essential
- **Skill Requirements**: Familiarity with VMware, Dell hardware, and DAP

### Licensing Considerations
- **BYOS Requirement**: Customer must provide VMware licenses
- **Dell IP Management**: Dell IP Management Software subscription required
- **License Management**: Customer responsible for VMware license compliance

## Comparison with VxRail

| Aspect | VO | VX |
|--------|-----|-----|
| **Hardware Model** | Disaggregated | Appliance |
| **Compute** | Customer-supplied PowerEdge | Factory-provisioned VxRail |
| **Storage** | PowerStore or compatible | vSAN (VxRail-managed) |
| **Management** | Dell Private Cloud Manager | VxRail Manager |
| **Orchestration** | TOSCA blueprints via DAP | State machine orchestration |
| **Node Discovery** | Customer-supplied iDRAC | Auto-discovery via serial number |
| **Licensing** | BYOS only | BYOS or OEM |
| **Markets** | Excludes China, Federal initially | Global including China, Federal |

---

**Next**: [VxRail (VX)](02-vxrail.md)
