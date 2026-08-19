# Appendix A: Administrative Commands

## Kubernetes Commands

### Service Management

#### List All Pods
```bash
kubectl get pods -n helium
```

#### Restart a Service
```bash
kubectl rollout restart deployment <service-name> -n helium
```

#### Scale a Service
```bash
kubectl scale deployment <service-name> --replicas=<count> -n helium
```
*Note: Scaling is not recommended for production due to file-based state persistence*

#### View Service Logs
```bash
kubectl logs -f <pod-name> -n helium
```

#### View Service Logs for All Pods in a Deployment
```bash
kubectl logs -f deployment/<deployment-name> -n helium
```

#### View Previous Pod Logs
```bash
kubectl logs <pod-name> -n helium --previous
```

### Configuration Management

#### List ConfigMaps
```bash
kubectl get configmaps -n helium
```

#### List Secrets
```bash
kubectl get secrets -n helium
```

#### View ConfigMap
```bash
kubectl describe configmap <configmap-name> -n helium
```

#### View ConfigMap Data
```bash
kubectl get configmap <configmap-name> -n helium -o yaml
```

#### View Secret (Decoded)
```bash
kubectl get secret <secret-name> -n helium -o jsonpath='{.data.<key>}' | base64 -d
```

#### Edit ConfigMap
```bash
kubectl edit configmap <configmap-name> -n helium
```

#### Edit Secret
```bash
kubectl edit secret <secret-name> -n helium
```

### Health Check

#### Check Pod Status
```bash
kubectl get pods -n helium
```

#### Check Pod Details
```bash
kubectl describe pod <pod-name> -n helium
```

#### Check Service Endpoints
```bash
kubectl get endpoints -n helium
```

#### Check Deployment Status
```bash
kubectl rollout status deployment/<deployment-name> -n helium
```

### Namespace Operations

#### List All Namespaces
```bash
kubectl get namespaces
```

#### Describe Namespace
```bash
kubectl describe namespace helium
```

### Resource Monitoring

#### Check Resource Usage
```bash
kubectl top pods -n helium
```

#### Check Node Resource Usage
```bash
kubectl top nodes
```

## vCenter Commands

### Using govc

#### List VMs
```bash
govc ls /
```

#### Get VM Details
```bash
govc vm.info <vm-path>
```

#### List Hosts
```bash
govc ls -l host
```

#### Get Host Details
```bash
govc host.info <host-ip>
```

#### List Datastores
```bash
govc ls -l datastore
```

#### Get Datastore Details
```bash
govc datastore.info <datastore-name>
```

#### List Networks
```bash
govc ls -l network
```

### vCenter Service Management

#### Restart vCenter Services
```bash
service-control --stop --all
service-control --start --all
```

#### Check vCenter Service Status
```bash
service-control --status
```

## DPC Manager / VxRail Manager Commands

### Service Status

#### Check Service Status via API
```bash
curl -k https://<dpc-manager>/api/v1/status
```

#### Check Health Status
```bash
curl -k https://<dpc-manager>/api/v1/health
```

#### Check Bootstrap Status
```bash
curl -k https://<dpc-manager>/internal/lcm/v1/init/status
```

### Configuration Management

#### Get Deployment Type
```bash
curl -k https://<dpc-manager>/internal/v1/config/deployment-type
```

#### Get Cluster Information
```bash
curl -k https://<dpc-manager>/internal/v1/cluster/info
```

## Diagnostic Commands

### Log Collection

#### Collect Log Bundle via API
```bash
curl -k -X POST https://<dpc-manager>/internal/v1/telemetry/log-bundle
```

#### Collect Connectivity Backup (VX)
```bash
curl -k -X POST https://<vxrail-manager>/internal/rcs/v1/remote-connector/backup
```

### Health Check

#### Run Health Check
```bash
curl -k https://<dpc-manager>/internal/v1/health/check
```

#### Run Pre-Check
```bash
curl -k -X POST https://<dpc-manager>/internal/v1/lcm/precheck
```

### Telemetry

#### Get Telemetry Status
```bash
curl -k https://<dpc-manager>/internal/v1/telemetry/status
```

#### Trigger Telemetry Collection
```bash
curl -k -X POST https://<dpc-manager>/internal/v1/telemetry/collect
```

## Network Commands

### Connectivity Testing

#### Test vCenter Connectivity
```bash
ping <vcenter-fqdn>
telnet <vcenter-fqdn> 443
```

#### Test Storage Connectivity
```bash
ping <storage-array-fqdn>
telnet <storage-array-fqdn> 3260  # iSCSI
```

#### Test iDRAC Connectivity
```bash
ping <idrac-ip>
telnet <idrac-ip> 443
```

### Network Configuration

#### Check Network Interfaces
```bash
ip addr show
```

#### Check Network Routes
```bash
ip route show
```

#### Check DNS Resolution
```bash
nslookup <fqdn>
dig <fqdn>
```

## Storage Commands

### Storage Array Management

#### Check Storage Array Status
```bash
# PowerStore CLI example
powershell -File check-storage-status.ps1
```

#### Check Multipathing Status
```bash
esxcli storage core path list
```

#### Check Datastore Status
```bash
govc datastore.info <datastore-name>
```

## Hardware Commands

### iDRAC Management

#### Check iDRAC Status
```bash
ipmitool -H <idrac-ip> -U <username> -P <password> sensor list
```

#### Reset iDRAC
```bash
ipmitool -H <idrac-ip> -U <username> -P <password> mc reset cold
```

#### Check iDRAC Firmware Version
```bash
ipmitool -H <idrac-ip> -U <username> -P <password> mc info
```

## Security Commands

### Certificate Management

#### Check Certificate Expiration
```bash
openssl x509 -in <certificate-file> -noout -dates
```

#### View Certificate Details
```bash
openssl x509 -in <certificate-file> -text -noout
```

#### Test TLS Connection
```bash
openssl s_client -connect <hostname>:443 -showcerts
```

### Secret Management

#### List Kubernetes Secrets
```bash
kubectl get secrets -n helium
```

#### Create Secret from Literal
```bash
kubectl create secret generic <secret-name> --from-literal=<key>=<value> -n helium
```

#### Create Secret from File
```bash
kubectl create secret generic <secret-name> --from-file=<file> -n helium
```

## Troubleshooting Commands

### Service Troubleshooting

#### Check Service Logs
```bash
kubectl logs -f <pod-name> -n helium --tail=100
```

#### Check Service Events
```bash
kubectl get events -n helium --sort-by='.lastTimestamp'
```

#### Describe Service Issues
```bash
kubectl describe pod <pod-name> -n helium
```

### Network Troubleshooting

#### Check Network Policies
```bash
kubectl get networkpolicies -n helium
```

#### Check Service Connectivity
```bash
kubectl run -it --rm debug --image=nicolaka/netshoot --restart=Never -- <target-service>
```

### Storage Troubleshooting

#### Check Persistent Volumes
```bash
kubectl get pv -n helium
kubectl get pvc -n helium
```

#### Check Storage Class
```bash
kubectl get storageclass
```

## Backup and Recovery Commands

### Backup Operations

#### Backup Kubernetes Resources
```bash
kubectl get all -n helium -o yaml > backup.yaml
```

#### Backup ConfigMaps
```bash
kubectl get configmaps -n helium -o yaml > configmaps-backup.yaml
```

#### Backup Secrets
```bash
kubectl get secrets -n helium -o yaml > secrets-backup.yaml
```

### Recovery Operations

#### Restore from Backup
```bash
kubectl apply -f backup.yaml
```

#### Restore ConfigMaps
```bash
kubectl apply -f configmaps-backup.yaml
```

#### Restore Secrets
```bash
kubectl apply -f secrets-backup.yaml
```

## Performance Commands

### Resource Monitoring

#### Check Pod Resource Usage
```bash
kubectl top pods -n helium
```

#### Check Container Resource Usage
```bash
kubectl top pod <pod-name> -n helium --containers
```

#### Check Node Resource Usage
```bash
kubectl top nodes
```

### Performance Analysis

#### Check Service Response Time
```bash
curl -w "@curl-format.txt" -o /dev/null -s https://<service-endpoint>/api/v1/health
```

#### Check Database Performance
```bash
# For SQLite databases
sqlite3 <database-file> "PRAGMA integrity_check;"
```

## Upgrade Commands

### Pre-Upgrade Checks

#### Run Pre-Check Validation
```bash
curl -k -X POST https://<dpc-manager>/internal/v1/lcm/precheck
```

#### Check Compatibility
```bash
curl -k https://<dpc-manager>/internal/v1/lcm/compatibility
```

### Upgrade Operations

#### Compose Target State
```bash
curl -k -X POST https://<dpc-manager>/internal/v1/lcm/compose-target-state -H "Content-Type: application/json" -d '{"target_version": "<version>"}'
```

#### Stage Upgrade Payloads
```bash
curl -k -X POST https://<dpc-manager>/internal/v1/lcm/stage -H "Content-Type: application/json" -d '{"target_version": "<version>"}'
```

#### Execute Upgrade
```bash
curl -k -X POST https://<dpc-manager>/internal/v1/lcm/execute -H "Content-Type: application/json" -d '{"target_version": "<version>"}'
```

## Utility Commands

### File Operations

#### Copy Files from Pod
```bash
kubectl cp <pod-name>:/path/to/file ./local-file -n helium
```

#### Copy Files to Pod
```bash
kubectl cp ./local-file <pod-name>:/path/to/file -n helium
```

### Debugging

#### Start Debug Pod
```bash
kubectl run -it --rm debug --image=busybox --restart=Never -- sh
```

#### Port Forward to Service
```bash
kubectl port-forward service/<service-name> <local-port>:<service-port> -n helium
```

### Environment Variables

#### Get Pod Environment Variables
```bash
kubectl exec <pod-name> -n helium -- env
```

#### Get Container Environment Variables
```bash
kubectl exec <pod-name> -n helium -c <container-name> -- env
```

---

**Next**: [Configuration Reference](appendix-b-configuration-reference.md)
