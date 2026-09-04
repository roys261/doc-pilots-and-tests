# Appendix B: Configuration Reference

## Kubernetes ConfigMaps

### Deployment Configuration

#### deployment-config
**Purpose**: Core deployment configuration for the management plane

**Key Settings**:
- `deployment_type`: Immutable deployment type (VO_VVF, VO_VCF, VX_VVF, VX_VCF)
- `product_type`: Product line identifier (VO or VX)
- `envProductName`: Product name for role configuration (Dell Private Cloud or VxRail)
- `cluster_name`: Cluster identifier
- `manager_fqdn`: Management plane FQDN

**Default Values**:
- `deployment_type`: Set during Day 1 deployment
- `product_type`: VO or VX based on product line
- `envProductName`: Dell Private Cloud or VxRail

**Impact of Changes**: Deployment type changes are not supported after Day 1

**Related Files**: Helm chart values, cluster state

### Network Configuration

#### network-config
**Purpose**: Network configuration parameters

**Key Settings**:
- `management_vlan`: Management network VLAN ID
- `vmotion_vlan`: vMotion network VLAN ID
- `storage_vlan`: Storage network VLAN ID
- `vm_vlan`: VM network VLAN ID
- `system_vm_vlan`: System VM network VLAN ID
- `management_mtu`: Management network MTU
- `vmotion_mtu`: vMotion network MTU
- `storage_mtu`: Storage network MTU

**Default Values**:
- VLAN IDs: Defined during deployment
- MTU: 1500 (standard Ethernet)

**Recommended Values**:
- MTU: 9000 for jumbo frames if network supports it
- VLAN IDs: Align with data center network segmentation

**Impact of Changes**: Affects network connectivity and performance

**Related Files**: Distributed virtual switch configuration, VMkernel interface settings

### DNS Configuration

#### dns-config
**Purpose**: DNS server configuration

**Key Settings**:
- `dns_servers`: Comma-separated list of DNS server IP addresses
- `dns_search_domains`: DNS search domains
- `dns_timeout`: DNS query timeout in seconds

**Default Values**:
- `dns_servers`: Customer-supplied during deployment
- `dns_timeout`: 5 seconds

**Recommended Values**: Use enterprise-standard DNS infrastructure

**Impact of Changes**: Affects name resolution and system performance

**Related Files**: ESXi host configuration, vCenter DNS settings

### NTP Configuration

#### ntp-config
**Purpose**: NTP server configuration for time synchronization

**Key Settings**:
- `ntp_servers`: Comma-separated list of NTP server IP addresses or FQDNs
- `ntp_timezone`: System timezone
- `ntp_max_poll`: Maximum NTP poll interval

**Default Values**:
- `ntp_servers`: Customer-supplied during deployment
- `ntp_timezone`: UTC

**Recommended Values**: Use enterprise-standard NTP infrastructure

**Impact of Changes**: Affects time synchronization and logging accuracy

**Related Files**: ESXi host configuration, vCenter NTP settings

## Kubernetes Secrets

### vCenter Credentials

#### vc-management-account
**Purpose**: vCenter management account credentials

**Keys**:
- `username`: vCenter management account username
- `password`: vCenter management account password
- `state`: Credential state (NORMAL, PASSWORD_EXPIRED, INVALID_LOGIN, LOCKED)

**Default Values**: Created during deployment with specified credentials

**Recommended Values**: Use strong passwords, regular rotation per security policy

**Impact of Changes**: Affects authentication and service connectivity

**Related Files**: vCenter user management, security-service configuration

### ESXi Credentials

#### esxi-management-account-{serial-number}
**Purpose**: Per-host ESXi management account credentials

**Keys**:
- `username`: ESXi management account username
- `password`: ESXi management account password
- `state`: Credential state (NORMAL, PASSWORD_EXPIRED, INVALID_LOGIN, LOCKED)

**Default Values**: Created during deployment with specified credentials

**Recommended Values**: Use strong passwords, regular rotation per security policy

**Impact of Changes**: Affects host-level authentication and operations

**Related Files**: ESXi user management, security-service configuration

### OAuth2 Tokens

#### oauth2-refresh-token
**Purpose**: OAuth2 refresh token for Dell Identity Gateway authentication

**Keys**:
- `refresh_token`: OAuth2 refresh token
- `client_id`: OAuth2 client identifier
- `token_expiry`: Token expiration timestamp

**Default Values**: Generated during OAuth2 device flow

**Recommended Values**: Automatic rotation every ~90 days

**Impact of Changes**: Affects Dell portal access and automatic downloads

**Related Files**: token-service configuration, Dell Identity Gateway

### Universal Keys

#### universal-key
**Purpose**: Universal keys for remote connectivity (ESE/iDRAC)

**Keys**:
- `key`: Encrypted universal key
- `key_expiry`: Key expiration timestamp
- `rotation_interval`: Key rotation interval

**Default Values**: Generated during initial configuration

**Recommended Values**: Automatic rotation every 90 days

**Impact of Changes**: Affects remote connectivity and support operations

**Related Files**: ESE configuration, iDRAC configuration

### Certificate Secrets

#### tls-certificates
**Purpose**: TLS certificates for secure communications

**Keys**:
- `ca-cert`: CA certificate
- `server-cert`: Server certificate
- `server-key`: Server private key
- `cert-chain`: Certificate chain

**Default Values**: Self-signed certificates during deployment

**Recommended Values**: Use enterprise PKI-issued certificates for production

**Impact of Changes**: Affects TLS trust and service communication

**Related Files**: Certificate stores, vCenter certificate management

## Service Configuration

### Day 2 Ops Service

**Configuration**: Kubernetes ConfigMaps and Secrets

**Key Settings**:
- vCenter connection parameters (FQDN, credentials)
- SDDC Manager connection parameters (VCF deployments only)
- iDRAC connection parameters
- Deployment type behavior selection
- Operation timeout values
- Retry configuration

**Default Values**:
- Timeouts: Configured per operation type
- Retry count: 3 for transient failures

**Recommended Values**: Adjust timeouts based on environment size and complexity

**Impact of Changes**: Affects operation behavior and performance

**Related Files**: Day 2 Ops Service configuration, workflow engine settings

### LCM Service

**Configuration**: Kubernetes ConfigMaps and Secrets

**Key Settings**:
- vLCM configuration parameters
- KGS/Recipe configuration
- Parallel remediation settings (VO_VVF only)
- Upgrade timeout values
- Pre-check configuration
- Service Data Bundle (SDB) configuration

**Default Values**:
- Parallel remediation: Disabled by default
- Timeouts: Configured per upgrade type

**Recommended Values**: Enable parallel remediation for faster upgrades (VO_VVF)

**Impact of Changes**: Affects upgrade behavior, duration, and cluster availability

**Related Files**: LCM Service configuration, vLCM settings

### Serviceability Services

**Configuration**: Kubernetes ConfigMaps and Secrets

**Key Settings**:
- Event pipeline configuration
- Telemetry collection schedule
- Connectivity configuration (VX via ESE, VO via DAPO)
- Proxy configuration
- Log retention settings
- Alert thresholds

**Default Values**:
- Telemetry schedule: Every 24 hours
- Log retention: 30 days
- Alert thresholds: Product-defined defaults

**Recommended Values**: Adjust schedules and thresholds based on operational requirements

**Impact of Changes**: Affects monitoring, alerting, and support capabilities

**Related Files**: Serviceability service configuration, event pipeline settings

### Security Service

**Configuration**: Kubernetes ConfigMaps and Secrets

**Key Settings**:
- vCenter connection parameters
- Role configuration (DPC VMware Management or VMware HCIA Management)
- Session timeout values
- Token refresh intervals
- OAuth2 configuration

**Default Values**:
- Session timeout: 8 hours
- Token refresh: As needed

**Recommended Values**: Align with organizational security policies

**Impact of Changes**: Affects authentication, authorization, and session management

**Related Files**: Security service configuration, vCenter SSO settings

## Configuration Validation

### Pre-Deployment Validation
- Schema validation for configuration files
- Secret validation for credentials
- Network connectivity validation
- External system reachability validation

### Post-Deployment Validation
- Service health checks
- Configuration application verification
- Integration testing
- Functional validation

### Configuration Rollback
- Maintain configuration history
- Document configuration changes
- Test rollback procedures
- Validate rollback functionality

## Configuration Best Practices

### Change Management
- Document all configuration changes
- Test changes in non-production environment
- Use version control for configuration files
- Implement approval process for changes

### Security
- Use strong credentials for all secrets
- Rotate credentials regularly
- Limit access to configuration secrets
- Audit configuration changes

### Monitoring
- Monitor configuration drift
- Validate configuration regularly
- Alert on configuration errors
- Review configuration logs

---

**Next**: [Repository Sources](appendix-c-repository-sources.md)
