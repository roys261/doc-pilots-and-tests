# Appendix D: Glossary

## Product-Specific Terminology

### Product Identifiers

| Term | Definition |
|------|------------|
| **Dell Private Cloud** | Dell's disaggregated hardware platform, delivered through Dell Automation Platform (DAP), that enables deployment, management, and operation of VMware software platforms (VVF, VCF) on standard Dell PowerEdge servers and Dell storage arrays with BYOS licensing |
| **VMware on Dell Private Cloud** | Umbrella term for the two VMware-based products on Dell Private Cloud (VO_VVF and VO_VCF) |
| **VO** | VMware Outcome — internal codename for the VMware on Dell Private Cloud product line |
| **VO_VVF** | VMware vSphere on Dell Private Cloud — Deploys and manages VMware vSphere Foundation on the Dell Private Cloud hardware platform with options for integrated or compatible Dell storage and BYOS licensing |
| **VO_VCF** | VMware Cloud Foundation on Dell Private Cloud — Leverages DAP blueprints as the foundation, deploys the VCF installer to deploy and configure vCenter, VCF Ops, NSX, and VCF Automation |
| **VX** | Internal codename for VxRail product line |
| **VX_VVF** | VxRail — VxRail running VMware vSphere Foundation — factory-provisioned VxRail HCI appliances with VxRail Manager enabled node auto-discovery |
| **VX_VCF** | VCF on VxRail — VMware Cloud Foundation on VxRail — VxRail HCI appliances co-engineered with Broadcom to deploy and manage VMware Cloud Foundation |
| **Deployment Type** | Immutable identifier set at Day 1: VO_VVF, VO_VCF, VX_VVF, or VX_VCF. Persisted in cluster state |
| **BYOS** | Bring-Your-Own-Subscription — VMware licensing model where customers provide their own VMware licenses. Dell Private Cloud uses BYOS; VxRail supports both BYOS and OEM licensing |
| **HCI** | Hyperconverged Infrastructure — Converged compute, storage, and networking in a single appliance (VxRail model) |

### VMware Platform Components

| Term | Definition |
|------|------------|
| **VVF** | VMware vSphere Foundation — Lightweight VMware vSphere offering. The VMware platform underlying VO_VVF and VX_VVF |
| **VCF** | VMware Cloud Foundation — Enterprise VMware cloud platform with vCenter, SDDC Manager, NSX, and vSAN. The VMware platform underlying VO_VCF and VX_VCF |
| **vCenter** | VMware vCenter Server — Centralized management server for VMware vSphere environments |
| **vLCM** | vSphere Lifecycle Manager — VMware's automated patch and upgrade management system. Manages ESXi images, firmware, and drivers |
| **ESXi** | VMware ESXi hypervisor — Type-1 hypervisor that runs on bare-metal servers |
| **vSAN** | VMware Virtual SAN — Software-defined storage solution for vSphere environments |
| **NSX** | VMware NSX — Network virtualization and security platform |
| **SDDC Manager** | VMware SDDC Manager — Management platform for VMware Cloud Foundation |

### Dell Hardware & Infrastructure

| Term | Definition |
|------|------------|
| **PowerEdge** | Dell's enterprise server line. Both Dell Private Cloud and VxRail use PowerEdge hardware |
| **iDRAC** | Integrated Dell Remote Access Controller — Out-of-band management controller (BMC) on every PowerEdge server. Provides Redfish API, virtual console, and virtual media |
| **BOSS** | Boot Optimized Storage Solution — Dell's M.2 NVMe RAID device for ESXi boot |
| **PowerStore** | Dell's modern storage array platform. Primary storage for Dell Private Cloud |
| **KGS** | Known Good State — Dell-validated firmware compatibility catalog mapping software, hardware (PowerEdge firmware), ESXi, and Dell Vendor Add-ons |
| **Recipe** | Validated component version set published independently of software releases. Auto-ingested by connected clusters within 4 hours |
| **ESE** | Embedded Service Enabler — Dell support connector for secure file upload, heartbeat reporting, gateway failover, call-home event delivery, and remote script dispatch |
| **SRS** | Secure Remote Services — Legacy Dell support connectivity (predecessor to ESE) |
| **DAP** | Dell Automation Platform — Dell's orchestration platform for TOSCA blueprint execution |
| **DAPO** | DAP Orchestrator — The orchestration engine within DAP that executes TOSCA blueprints |

### Networking

| Term | Definition |
|------|------------|
| **NIC Mapping** | Assignment of physical NICs (vmnics) to VDS uplinks and port groups |
| **NIC Homogeneity** | Requirement that all cluster nodes have identical NIC configuration (model, speed, count) |
| **Management Network** | Network for ESXi management traffic, vCenter access, and management plane communication |
| **vMotion Network** | Dedicated network for VMware vMotion live migration traffic |
| **Storage Network** | Network for iSCSI, NFS, or FC-over-IP storage traffic (VO) |
| **System-VM Network** | Network for management VMs and other system VMs |
| **VM Network** | General workload VM network |
| **mDNS** | Multicast DNS — Zero-configuration name resolution used for node discovery |
| **Link-local** | IPv6 auto-configured address scope. iDRAC uses link-local address 169.254.0.1 for USB NIC management during provisioning |
| **VDS** | VMware vSphere Distributed Switch — Virtual switch that provides network connectivity to VMs across multiple ESXi hosts |

### Day 0 / Day 1 / Day 2 Operations

| Term | Definition |
|------|------------|
| **Day 0** | Bare-metal provisioning phase — Factory delivery, hardware onboarding, ESXi imaging, firmware updates |
| **Day 0.5** | Pre-deployment validation and network configuration phase between hardware provisioning and cluster deployment |
| **Day 1** | Initial cluster deployment phase — Cluster formation, vCenter setup, storage integration, management plane initialization |
| **Day 2** | Post-deployment operations — Node add/remove, lifecycle upgrades, serviceability, and ongoing management |
| **Onboarding** | Initial asset registration in inventory |
| **Fermion** | Hardware scanning and abstraction component. Provides host hardware inventory, disk serial numbers, and health data via REST API |
| **Provisioning** | System configuration and deployment — Transforming a bare-metal or factory-provisioned node into a cluster-ready host |
| **Cluster Deployment** | Day 1 creation of a new vSphere or VCF cluster from bare-metal or factory-provisioned nodes |
| **Cluster Initialization** | Post-deployment cluster configuration — Cert exchange, account creation, plugin registration, management plane deployment |
| **Node Addition** | Day 2 operation — Adding new hosts to an existing cluster (1-8 nodes per operation) |
| **Node Reclaim** | Day 2 operation — Removing nodes from the vSphere cluster through cleanup and factory reset |
| **Cluster Shutdown** | Graceful cluster power-down with VM evacuation, auto-start configuration, and ordered host shutdown |
| **Cursory Validation** | Fast static validation — Checks inputs, formats, and basic reachability without live environment mutations |
| **Thorough Validation** | Deep validation — Checks DNS resolution, network connectivity, MTU consistency, NIC compatibility, and live traffic tests |
| **Pre-check / Pre-flight Validation** | Validation performed before an operation begins (deployment, upgrade, node add) |
| **Dry-run** | Pre-check mode that validates without making changes |
| **Resumability** | Blueprint capability to resume from the last successful step after a transient failure |
| **Physical View** | vCenter UI feature showing hardware visualization — Cluster-level and host-level chassis views, component health, firmware, and alerts |

### Lifecycle Management (LCM)

| Term | Definition |
|------|------------|
| **LCM** | Lifecycle Management — Ongoing upgrades, patches, and compliance management |
| **Compose Target State** | Upgrade planning phase — Selecting target versions with automatic dependency resolution |
| **Staging** | Pre-downloading all upgrade payloads to local cluster storage before the maintenance window |
| **Pre-checks** | Upgrade readiness validation. Results: Error (blocks), Warning (discretion), Informational |
| **Update Execution** | Upgrade application phase — Software at cluster level, then host-level components via vLCM with maintenance mode orchestration |
| **Update Advisor Report** | Consolidates pre-check results, change lists, and per-cluster install time estimates. Exportable to HTML/PDF |
| **Compliance Reporting** | Scanning cluster components against KGS baseline to detect version drift |
| **Service Data Bundle (SDB)** | Metadata bundle for upgrade validation rules and pre-checks. Updatable independently of product releases |
| **N-1 Guardrails** | Cluster availability protection — Ensures at least one host remains operational during parallel remediation |
| **Firmware Upgrade** | Updating PowerEdge server firmware (BIOS, iDRAC, NIC, storage controller) to KGS-declared levels |
| **vLCM Baseline / Desired State** | Target firmware and software configuration managed by vSphere Lifecycle Manager |
| **Custom Component** | GPU, HBA, or other non-Dell-managed firmware/drivers applied in the same host reboot cycle |
| **Connected Mode** | Cluster has internet connectivity for automatic KGS/recipe ingestion and Dell SaaS integration |
| **Disconnected Mode (Air-gapped)** | Cluster operates without internet. Payloads are uploaded manually. All capabilities maintain parity with connected mode |
| **Upgrade Path** | Validated sequence of version transitions (e.g., ESXi 7.x -> 8.x -> 9.x) |

### Serviceability

| Term | Definition |
|------|------------|
| **Event Pipeline** | Multi-source event collection (iDRAC, vCenter, extension services) with 3-stage processing — Transformer (normalize), Doctor (validate/throttle/deduplicate), Distributor (route to UI, vCenter, Dell backend) |
| **Telemetry** | Multi-group data collection with scheduled execution, automatic retry, and storage lifecycle management |
| **Log Bundles** | Multi-source parallel collection (Outcome extension, Connectivity, iDRAC, ESXi, vCenter) with per-source subtask tracking |
| **Remote Connectivity** | Connectivity configuration is handled by DAP orchestrator. The delivery of events, logs, and telemetry to Dell backend is managed by the DPC Agent via the DAP orchestrator path |
| **eServices** | Proxy configuration, Dell Support integration |
| **Transformer** | First stage of event pipeline — Normalizes events from multiple sources into a common format |
| **Doctor** | Second stage of event pipeline — Validates, throttles, and deduplicates events |
| **Distributor** | Third stage of event pipeline — Routes events to appropriate destinations (UI, vCenter, Dell backend) |

### Security

| Term | Definition |
|------|------------|
| **RBAC** | Role-Based Access Control — Authorization model based on user roles and permissions |
| **SSO** | Single Sign-On — Centralized authentication service. vCenter SSO is used as the identity provider |
| **OAuth2** | Open Authorization 2.0 — Authorization framework for token-based authentication |
| **Device Authorization Grant** | OAuth2 flow for headless devices — Used for Dell Identity Gateway authentication |
| **Clone Ticket** | vCenter session mechanism that allows session cloning for efficient connection pooling |
| **Kubernetes Secret** | Kubernetes object for storing sensitive data such as passwords, OAuth tokens, and SSH keys |
| **AES-256** | Advanced Encryption Standard 256-bit — Encryption standard used for data at rest |
| **TLS 1.3** | Transport Layer Security 1.3 — Cryptographic protocol for secure communications |
| **mTLS** | Mutual TLS — Mutual authentication using TLS where both client and server authenticate each other |
| **ForwardAuth** | Traefik middleware for authentication delegation — Validates requests against an authentication service |

### Components and Services

| Term | Definition |
|------|------------|
| **DPC Manager** | Dell Private Cloud Manager — Central management VM for VO deployments, hosting Kubernetes cluster and microservices |
| **VxRail Manager** | Central management VM for VX deployments, hosting Kubernetes cluster and microservices |
| **DPC Extension** | vSphere Client remote plugin for VO deployments, branded "Dell Private Cloud" |
| **VxRail Plugin** | vSphere Client remote plugin for VX deployments, branded "VxRail" |
| **PLIS** | First-boot runtime for ESXi hosts — Executes provisioning phases after ESXi installation |
| **node-agent** | Persistent host daemon on each ESXi host that proxies host-local iDRAC Redfish access |
| **Fermion** | Hardware abstraction service on the management plane that provides inventory and hardware operations |
| **DPC Agent** | K8s-to-DAPO bridge for VO deployments — Relays events, telemetry, and commands via NATS |
| **vo-event-pipeline** | Serviceability service for event processing — Three-stage pipeline for event collection, filtering, and distribution |
| **vo-telemetry** | Serviceability service for telemetry collection — Scheduled data collection, log bundles, heartbeat |
| **vo-rcs** | Serviceability service for remote connectivity (VX only) — Gateway to Dell backend via ESE |
| **session-manager** | Security service for vCenter session pooling — Centralized vCenter connection with clone ticket distribution |
| **security-service** | Security service for authentication and authorization — Stateless auth proxy with real-time validation |
| **token-service** | Security service for OAuth2 token management — Handles OAuth2 device flow for Dell Identity Gateway |
| **Common Check Engine (CCE)** | CRD-driven Kubernetes health check operator — Executes check profiles via Scanning Custom Resources |

### Technical Terms

| Term | Definition |
|------|------------|
| **TOSCA** | Topology and Orchestration Specification for Cloud Applications — DSL for defining cloud applications and their relationships |
| **Dell DSL** | Dell-specific extension of TOSCA for DAP blueprint definitions |
| **CRD** | Custom Resource Definition — Kubernetes extension for defining custom resources |
| **Helm** | Kubernetes package manager — Used for deploying and managing Kubernetes applications |
| **RKE2** | Rancher Kubernetes Engine 2 — Kubernetes distribution used for the management plane |
| **NATS** | Cloud-native messaging system — Used for message passing between services |
| **RabbitMQ** | Message broker — Used for event pipeline message queuing |
| **Redis** | In-memory data structure store — Used for distributed state and lock management in LCM |
| **SQLite** | Lightweight SQL database engine — Used for local data persistence in services |
| **Go** | Programming language (Golang) — Used for microservices |
| **Python** | Programming language — Used for blueprint scripts and tools |
| **Angular** | Web application framework — Used for UI development |
| **TypeScript** | Typed superset of JavaScript — Used for UI development |
| **REST API** | Representational State Transfer API — Architectural style for web services |
| **Redfish** | RESTful API for server management — Used for iDRAC hardware management |
| **OVA** | Open Virtualization Appliance — Virtual machine packaging format |
| **VIB** | vSphere Installation Bundle — Package format for ESXi extensions |

---

**Next**: [Known Limitations](appendix-e-known-limitations.md)
