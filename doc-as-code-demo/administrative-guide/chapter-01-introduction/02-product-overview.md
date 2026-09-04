# Product Overview

## VMware on Dell Private Cloud Family

The VMware on Dell Private Cloud product family consists of two hardware platforms, each supporting two VMware software platforms, producing four deployment types:

| Product | Internal Code | Hardware | Management Plane | Licensing |
|---------|---------------|----------|-----------------|-----------|
| VMware vSphere on Dell Private Cloud | VO_VVF | Bare Dell PowerEdge | Dell Private Cloud Manager | BYOS |
| VMware Cloud Foundation on Dell Private Cloud | VO_VCF | Bare Dell PowerEdge | Dell Private Cloud Manager | BYOS |
| VxRail | VX_VVF | VxRail HCI appliances | VxRail Manager | BYOS, OEM |
| VCF on VxRail | VX_VCF | VxRail HCI appliances | VxRail Manager | BYOS, OEM |

## Key Characteristics

### VMware on Dell Private Cloud (VO)
**Disaggregated Infrastructure Model**
- Standard Dell PowerEdge servers for compute
- Dell integrated or compatible storage arrays
- Bring-Your-Own-Subscription (BYOS) VMware licensing
- Independent scaling of compute, storage, and software
- Customer-supplied hardware and iDRAC information
- TOSCA blueprint-driven orchestration via DAP

**Target Customers**
- Enterprise customers seeking licensing flexibility
- Cloud Service Providers (CSPs) and Managed Service Providers (MSPs)
- Strategic and non-strategic accounts
- Channel partners and system integrators
- Industry verticals: Financial services, Healthcare, Manufacturing, Telecommunications, Energy, Public sector

**Key Benefits**
- Hardware portability and licensing flexibility
- Ability to reuse existing PowerEdge infrastructure
- Independent scaling of compute and storage
- Support for both VVF and VCF on same platform
- Future investment protection for Dell Solutions Platform

### VxRail (VX)
**Hyperconverged Appliance Model**
- Factory-provisioned VxRail HCI appliances
- Integrated compute, storage, and networking
- VxRail Manager as primary management plane
- Node auto-discovery via serial numbers
- Factory-validated firmware and ESXi baseline
- BYOS or OEM licensing options

**Target Customers**
- Enterprise customers seeking turnkey simplicity
- Existing VxRail install base ($14B refresh opportunity)
- Strategic accounts with existing Dell/VMware agreements
- Global markets including US Federal Government and China
- All industry verticals

**Key Benefits**
- Factory-provisioned, pre-validated appliances
- Minimal deployment complexity
- Integrated lifecycle management
- Global availability including restricted markets
- Established channel and support infrastructure

## Deployment Types

### VO_VVF: VMware vSphere on Dell Private Cloud
- **VMware Platform**: VMware vSphere Foundation (VVF)
- **Components**: ESX/ESXi, vCenter
- **Storage**: PowerStore over FC or iSCSI (integrated) or Dell-compatible arrays
- **vCenter**: DPC-deployed or customer-deployed
- **Node Operations**: Node addition, node reclaim
- **LCM**: vLCM-based upgrades with parallel remediation support

### VO_VCF: VMware Cloud Foundation on Dell Private Cloud
- **VMware Platform**: VMware Cloud Foundation (VCF)
- **Components**: ESX/ESXi, vCenter, SDDC Manager, NSX, VCF Operations, VCF Automation
- **Storage**: PowerStore over FC (integrated) or Dell-compatible arrays
- **vCenter**: Customer-deployed via VCF Installer
- **Scope**: Management domain and workload domains
- **Node Operations**: Host commissioning, manage node, node reclaim
- **LCM**: SDDC Manager-delegated upgrades

### VX_VVF: VxRail
- **VMware Platform**: VMware vSphere Foundation (VVF)
- **Components**: ESX/ESXi, vCenter
- **Storage**: vSAN HCI (VxRail-managed)
- **vCenter**: VxRail Manager-deployed or customer-deployed
- **Node Operations**: Node addition, host removal
- **LCM**: Composite bundle upgrades with VxRail Manager integration

### VX_VCF: VCF on VxRail
- **VMware Platform**: VMware Cloud Foundation (VCF)
- **Components**: ESX/ESXi, vCenter, SDDC Manager, NSX, VCF Operations
- **Storage**: vSAN HCI (VxRail-managed)
- **vCenter**: VxRail Manager-deployed or customer-deployed
- **Scope**: Management domain and workload domains
- **Node Operations**: Host commission, manage host/cluster
- **LCM**: SDDC Manager-delegated upgrades

## Deployment Type Selection

The deployment type is **immutable** - set during Day 1 deployment and persisted in cluster state. Selection should be based on:

### Hardware Preference
- **VO**: Prefer disaggregated model with independent scaling
- **VX**: Prefer appliance model with factory integration

### VMware Platform Requirements
- **VVF**: Basic VMware vSphere Foundation requirements
- **VCF**: Enterprise VMware Cloud Foundation requirements

### Management Model
- **VO**: Dell Private Cloud Manager with DAP orchestration
- **VX**: VxRail Manager with state machine orchestration

### Market and Compliance
- **VO**: Americas, core EMEA, extended EMEA, APJ (China excluded initially)
- **VX**: Global including US Federal Government and China

## Shared Capabilities

Both VO and VX share significant architectural components:

### Codebase
- Shared microservices architecture
- Common security infrastructure
- Shared serviceability components
- Unified lifecycle management framework

### Management Plane
- Kubernetes-based management VM
- vSphere Client remote plugin
- Similar operational workflows
- Common diagnostic and monitoring tools

### Security
- vCenter as single identity provider
- Role-based access control
- Credential and certificate management
- Encryption and secure communications

### Serviceability
- Event pipeline with three-stage processing
- Telemetry collection and reporting
- Log bundle generation
- Remote connectivity (VO via DAPO, VX via ESE)

## Administrative Responsibilities

Regardless of deployment type, administrators are responsible for:

### Day 0 Activities
- Hardware preparation and validation
- Network configuration
- Storage array configuration
- Initial system setup

### Day 1 Activities
- Cluster deployment and initialization
- Management plane deployment
- Integration configuration
- Initial security setup

### Day 2 Activities
- Node scaling and cluster management
- Configuration management
- Lifecycle management and upgrades
- Security and credential management
- Monitoring and troubleshooting
- Backup and recovery operations

### Ongoing Operations
- Health monitoring and maintenance
- Performance optimization
- Capacity planning
- Compliance management
- User and access management

---

**Next**: [Related Documentation](03-related-documentation.md)
