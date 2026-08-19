# Architecture Overview

## Platform Lifecycle

The VMware on Dell Private Cloud platform follows a three-phase lifecycle model:

### Day 0: Hardware Enablement and Management
Prepares bare-metal Dell PowerEdge servers for software deployment.

**VO (VMware on Dell Private Cloud)**
- Pre-touch input validation
- Hardware configuration checks and system profile application
- Firmware updates to certified levels
- PLIS and node-agent host runtime installation
- Fermion hardware abstraction deployment

**VX (VxRail)**
- Factory provisioning with ESXi and VIBs pre-installed
- NIM (Node Image Management) for re-imaging
- Firmware validation via DSU
- Auto-discovery preparation

### Day 1: Cluster Deployment and Initialization
Transforms prepared servers into production-ready clusters.

**VO_VVF**
- ESXi imaging and preparation
- Thorough validation
- Storage configuration (PowerStore automated, compatible manual)
- DPC Manager deployment and initialization
- Cluster initialization with HA/DRS/EVC

**VO_VCF**
- ESXi imaging and preparation
- Thorough validation
- Storage configuration
- VCF Installer deployment
- VCF Bringup Gate (operator-driven)
- DPC Manager deployment and initialization

**VX_VVF/VX_VCF**
- Node auto-discovery via VxRail Manager
- Validation and host configuration
- Cluster assembly
- Golden Image bundle deployment
- VxRail Manager setup

### Day 2: Operations
Ongoing lifecycle management for deployed clusters.

**Common Operations**
- Node scaling (add/remove/reclaim)
- Cluster configuration management
- Lifecycle management (upgrades)
- Serviceability (monitoring, logging, support)
- Security management (credentials, certificates)

**VO-Specific**
- Node addition via blueprint
- Node reclaim via blueprint
- vLCM-based upgrades
- Parallel remediation (VO_VVF)

**VX-Specific**
- Node addition (auto-discovered or customer-supplied)
- Host removal action
- Composite bundle upgrades
- Legacy upgrade support

**VCF-Specific (VO_VCF and VX_VCF)**
- Host commissioning
- Workload domain cluster management
- SDDC Manager-delegated upgrades

## Architecture Layers

### Client Layer
**Purpose**: User-facing interfaces for system interaction

**Components**:
- DPC Extension (VO): vSphere Client remote plugin branded "Dell Private Cloud"
- VxRail Plugin (VX): vSphere Client remote plugin branded "VxRail"

**Responsibilities**:
- Provide operator GUI
- Display cluster health and status
- Enable operational workflows
- Present alerts and events

### Security Layer
**Purpose**: Authentication, authorization, and session management

**Components**:
- security-service: Authentication and authorization
- session-manager: vCenter session pooling
- token-service: OAuth2 device flow for Dell Identity

**Responsibilities**:
- Validate user authentication via vCenter
- Enforce role-based access control
- Manage session tokens and credentials
- Handle OAuth2 flows for Dell services

### Business Services Layer
**Purpose**: Domain-specific business logic and orchestration

**Components**:
- Day 1 Service: Cluster deployment and initialization
- Day 2 Ops Service: Node and cluster operations
- LCM Service: Lifecycle management and upgrades
- Serviceability Services: Event pipeline, telemetry, log collection

**Responsibilities**:
- Implement business logic for each domain
- Orchestrate multi-step workflows
- Integrate with external systems
- Provide domain-specific APIs

### Management Plane Shared Services Layer
**Purpose**: Shared infrastructure capabilities for business services

**Components**:
- Fermion: Hardware abstraction service
- DPC Agent (VO): K8s-to-DAPO bridge
- Shared Platform Services: Connectivity, broker, health

**Responsibilities**:
- Provide hardware abstraction
- Bridge to external orchestration (DAPO)
- Shared connectivity and messaging
- Health check coordination

### Host Runtime Layer
**Purpose**: Host-resident components for hardware access and bootstrap

**Components**:
- PLIS: First-boot runtime for ESXi hosts
- node-agent: Persistent host-local iDRAC Redfish proxy
- IPv6 Proxy: IPv6 link-local address bridging (VCF)

**Responsibilities**:
- Bootstrap ESXi hosts
- Provide host-local hardware access
- Proxy iDRAC Redfish calls
- Enable IPv6 connectivity for VCF

### Infrastructure Layer
**Purpose**: External systems and runtime environment

**Components**:
- Kubernetes: Container orchestration
- vCenter Server: VMware management
- SDDC Manager: VCF management (VCF only)
- ESXi Hosts: VMware hypervisor
- iDRAC: Hardware management
- DAP Orchestrator: TOSCA blueprint execution
- Storage Arrays: PowerStore, vSAN, compatible arrays

**Responsibilities**:
- Provide runtime environment
- External system integration
- Hardware management
- Storage and networking

## Deployment Model

### VO_VCF Deployment View

```
┌─────────────────────────────────────────────────────────────┐
│                    DPC Manager VM (K8s)                      │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                  helium namespace                        │ │
│  │  ┌────────────────────────────────────────────────────┐ │ │
│  │  │ Traefik Ingress                                     │ │ │
│  │  ├────────────────────────────────────────────────────┤ │ │
│  │  │ Day 1 Service │ Day 2 Service │ LCM Service         │ │ │
│  │  ├────────────────────────────────────────────────────┤ │ │
│  │  │ Serviceability │ Security │ Fermion │ Shared       │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS :39090
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    ESXi Hosts (3-64 nodes)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ PLIS VIB     │  │ node-agent   │  │ IPv6 Proxy   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Redfish
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Server BMC (iDRAC)                        │
└─────────────────────────────────────────────────────────────┘
```

### Key Deployment Characteristics

**Kubernetes Services**
- All services run as single-replica deployments
- Recreate strategy to avoid write conflicts
- PersistentVolumes for task state and databases
- K8s Secrets for credential storage

**Host Components**
- PLIS for first-boot preparation
- node-agent for persistent iDRAC Redfish proxy
- IPv6 proxy for VCF networking

**External Integration**
- vCenter for authentication and VMware management
- SDDC Manager for VCF operations
- DAP Orchestrator for blueprint execution
- Storage arrays for data storage

## Cross-Cutting Concerns

### Authentication and Authorization
- **Single Identity Provider**: vCenter Server for all human authentication
- **Stateless Validation**: Real-time validation with no local cache
- **Role-Based Access Control**: Dell-specific vCenter roles
- **Centralized Enforcement**: Traefik ForwardAuth at ingress layer

### Security
- **Encryption at Rest**: AES-256 for secrets and sensitive data
- **Encryption in Transit**: TLS 1.3+ for all communications
- **Secrets Management**: Kubernetes secrets with RBAC
- **Certificate Management**: Lifecycle management for certificates

### Monitoring and Observability
- **Health Checks**: Kubernetes liveness and readiness probes
- **Logging**: Centralized log collection and aggregation
- **Telemetry**: Scheduled collection with retry logic
- **Event Pipeline**: Three-stage processing for events

### Resilience and Reliability
- **Retry Logic**: Automatic retry for transient failures
- **Resumability**: Blueprint and state machine resumability
- **Error Handling**: Consistent error handling patterns
- **Idempotency**: Design-for-idempotency in all operations

## Technology Stack

### Blueprint Technologies
- **DSL**: TOSCA (Dell DSL)
- **Platform**: DAPO (latest)
- **Scripting**: Python 3 (>=3.12), Shell/Bash
- **Plugins**: storage-plugin, edge-plugin, utilities-plugin, fabric-plugin, dpc-hardware-plugin

### Microservices Technologies
- **Language**: Go 1.26
- **Web Framework**: Gin v1.11
- **VMware SDK**: govmomi v0.48
- **Kubernetes**: client-go v0.33
- **Packaging**: Docker (latest)
- **Deployment**: Helm 3 (latest)

### Frontend Technologies
- **Framework**: Angular 21+
- **UI Design System**: Clarity Design System 17.13.0+
- **State Management**: Angular Signals + RxJS
- **Language**: TypeScript 5.9+
- **Build**: Angular CLI 21+
- **Serving**: Nginx (latest)

Source: <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\tech-stack.md" />

---

**Next**: [Management Plane](02-management-plane.md)
