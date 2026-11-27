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

## TaskManager Application

The TaskManager application consists of three main components:

### Frontend

The frontend is built using:
- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.8

The native Nginx server hosts the static frontend files.

The frontend communicates with the backend API using the `/api/` endpoint.

### Backend API

The backend is built with ASP.NET Core Web API.

It runs inside a Docker container and provides REST API endpoints.

Supported operations:
- GET: Retrieve tasks
- POST: Create a new task
- PUT: Update an existing task
- DELETE: Delete a task

The API exposes a health check endpoint at `/health`.

### Database

The application uses PostgreSQL as its database.

PostgreSQL runs in a separate Docker container.

Persistent storage is provided through a Docker named volume.

The database is not directly exposed to the host network.

### Application Request Flow

The application request flow:

1. The user accesses the frontend through HTTPS.
2. Nginx serves the static frontend files.
3. JavaScript sends API requests to `/api/`.
4. Nginx forwards API requests to the backend container.
5. The backend communicates with PostgreSQL.
6. The API returns the response to the frontend.

### Architecture Overview

Windows Browser
    |
    | HTTPS (443)
    v
Native Nginx
    |
    |---- Static Frontend
    |
    |---- /api/ Reverse Proxy
              |
              v
       TaskManager API
       Docker Container
              |
              v
       PostgreSQL
       Docker Container
              |
              v
       Docker Named Volume
