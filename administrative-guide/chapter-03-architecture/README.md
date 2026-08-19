# Chapter 3: Architecture

This chapter provides detailed technical architecture information for the VMware on Dell Private Cloud product family, including component relationships, data flows, and infrastructure design.

## Chapter Contents

### 3.1 Architecture Overview
High-level architecture including:
- Platform lifecycle (Day 0, Day 1, Day 2)
- Architecture layers and responsibilities
- Deployment model diagrams
- Cross-cutting concerns

### 3.2 Management Plane
Detailed coverage of the management plane including:
- DPC Manager / VxRail Manager VM architecture
- Kubernetes cluster organization
- Service deployment patterns
- Persistent storage architecture

### 3.3 Services
Detailed coverage of microservices including:
- Day 1 Service
- Day 2 Ops Service
- LCM Service
- Serviceability Services
- Security Services
- Shared platform services

### 3.4 Infrastructure Components
Coverage of infrastructure components including:
- Host runtime layer (PLIS, node-agent)
- External systems (vCenter, SDDC Manager, iDRAC)
- Storage infrastructure
- Network infrastructure

### 3.5 Data Flow
Detailed data flow diagrams including:
- Authentication flow
- Event pipeline flow
- Hardware access flow
- Telemetry flow
- Upgrade orchestration flow

## Key Architectural Concepts

### Layered Architecture
- **Client Layer**: User-facing interfaces (UI plugins)
- **Security Layer**: Authentication and authorization
- **Business Services Layer**: Domain-specific business logic
- **Management Plane Shared Services Layer**: Shared infrastructure capabilities
- **Host Runtime Layer**: Host-resident components
- **Infrastructure Layer**: External systems and runtime environment

### Service Patterns
- **Single-Replica Deployments**: File-based state persistence requires exclusive access
- **Modular Monolith**: Single service with package boundaries
- **Hub-and-Spoke Orchestration**: Central coordinator with specialized upgraders
- **Three-Stage Event Pipeline**: Transformer, Doctor, Distributor

### Cross-Cutting Concerns
- **Authentication**: vCenter as single identity provider
- **Authorization**: Role-based access control
- **Security**: Encryption, secrets management, certificate lifecycle
- **Monitoring**: Health checks, logging, telemetry
- **Resilience**: Retry logic, error handling, resumability

## Related Documentation

- <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\vo-vcf-product-hld.md" />
- <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\security-hld.md" />
- <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\architecture\domains\s12y-hld.md" />
- <ref_file file="C:\Users\roys26\CascadeProjects\private-cloud-vmware\specs\tech-stack.md" />

---

**Previous Chapter**: [Product Overview](../chapter-02-product-overview/README.md) | **Next**: [Architecture Overview](01-architecture-overview.md)
