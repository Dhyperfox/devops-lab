# Monitoring Stack

This directory contains the monitoring infrastructure for the DevOps homelab.

## Components

### Prometheus
Collects and stores time-series metrics from the server and Docker containers.

### Node Exporter
Exposes Linux host metrics, including CPU, memory and filesystem usage.

### cAdvisor
Collects resource usage metrics from running Docker containers.

### Grafana
Visualizes metrics collected by Prometheus through dashboards.

### Uptime Kuma
Monitors the availability and health of services, including the TaskManager API, Nginx, Prometheus and Grafana.

## Architecture

Prometheus collects metrics from Node Exporter and cAdvisor.

Grafana uses Prometheus as its data source.

Uptime Kuma performs HTTP health checks against the monitored services.

## Access

The monitoring services are bound to localhost and should be accessed through an SSH tunnel.

| Service | Local URL |
|---|---|
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3000 |
| Uptime Kuma | http://localhost:3001 |
| cAdvisor | http://localhost:8085 |

## Configuration

The Docker Compose configuration is located in `docker-compose.yml`.

Prometheus configuration is located in `prometheus/prometheus.yml`.

The exported Grafana dashboard is stored in `grafana/dashboards/`.

Persistent data is stored in Docker named volumes.
