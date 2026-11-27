# Server Information

## Environment
- OS: Ubuntu Server 26.04.1 LTS
- Hostname: ubuntutestserver
- Hypervisor: VirtualBox

## Network
- Network interface: enp0s3
- IP address: 192.168.0.109

## Services
- Nginx: Installed
- SSH: Enabled
- UFW: configured
- Fail2ban: confiured

## Nginx Reverse Proxy

The native Nginx installation acts as a reverse proxy for the TaskManager API.

### HTTPS Configuration

Nginx listens on port 443 with SSL enabled.

The current SSL certificate is self-signed and used for the homelab environment.

### API Reverse Proxy

Requests sent to `/api/` are forwarded to the TaskManager API running in Docker.

Upstream address:

`http://127.0.0.1:5001`

Example:

`https://localhost/api/health`

is forwarded to:

`http://127.0.0.1:5001/health`

### Proxy Headers

Nginx forwards the following headers:

- `Host`
- `X-Real-IP`
- `X-Forwarded-For`
- `X-Forwarded-Proto`

These headers preserve information about the original client request.

### Supported HTTP Methods

The reverse proxy has been tested successfully with:

- GET
- POST
- PUT
- DELETE

### Network Architecture

The API container port 8080 is published on the host's loopback interface
(127.0.0.1:5001), preventing direct access from other LAN devices.

External clients access the API through Nginx over HTTPS.
