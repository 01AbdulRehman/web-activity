# Docker Deployment & Registry Guide

This guide covers how to containerize, build, and push the Blog Platform to Docker Hub and GitHub Container Registry.

## Prerequisites

- Docker Desktop installed and running
- Docker Hub account (free at https://hub.docker.com/)
- GitHub account (for GitHub Container Registry)
- Git configured with credentials

## Building Docker Images Locally

### Step 1: Build All Services

```bash
cd blog-platform

# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
docker-compose build mongo  # (uses pre-built image)

# Show built images
docker images | grep blog
```

### Step 2: Run with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v
```

## Pushing to Docker Hub

### Step 1: Create Docker Hub Account

1. Go to https://hub.docker.com/
2. Click "Sign Up"
3. Create free account
4. Remember your username (used in image tags)

### Step 2: Login to Docker Hub

```bash
# Login to Docker Hub
docker login

# When prompted:
# Username: your-dockerhub-username
# Password: your-dockerhub-password

# Verify login
docker info | grep Username
```

### Step 3: Tag Images

```bash
# Tag backend image
# Format: docker tag source-image:tag dockerhub-username/image-name:tag

docker tag blog-platform-backend:latest yourusername/blog-backend:latest
docker tag blog-platform-backend:latest yourusername/blog-backend:v1.0.0

# Tag frontend image
docker tag blog-platform-frontend:latest yourusername/blog-frontend:latest
docker tag blog-platform-frontend:latest yourusername/blog-frontend:v1.0.0

# View tagged images
docker images | grep blog
```

### Step 4: Push to Docker Hub

```bash
# Push backend images
docker push yourusername/blog-backend:latest
docker push yourusername/blog-backend:v1.0.0

# Push frontend images
docker push yourusername/blog-frontend:latest
docker push yourusername/blog-frontend:v1.0.0

# Verify on https://hub.docker.com/
```

### Step 5: Use Images from Docker Hub

```bash
# Update docker-compose.yml to use your images
# Change:
# build:
#   context: ./backend
# To:
# image: yourusername/blog-backend:latest

# Or pull and run directly
docker run -d -p 5000:5000 yourusername/blog-backend:latest
docker run -d -p 3000:3000 yourusername/blog-frontend:latest
```

## Pushing to GitHub Container Registry (GHCR)

### Step 1: Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Select scopes: `write:packages`, `read:packages`, `delete:packages`
4. Generate and copy token

### Step 2: Login to GitHub Container Registry

```bash
# Login to GitHub Container Registry
echo YOUR_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Or interactive login
docker login ghcr.io
# Username: your-github-username
# Password: your-personal-access-token
```

### Step 3: Tag for GitHub Registry

```bash
# Format: ghcr.io/github-username/image-name:tag

# Tag backend
docker tag blog-platform-backend:latest ghcr.io/yourusername/blog-backend:latest
docker tag blog-platform-backend:latest ghcr.io/yourusername/blog-backend:v1.0.0

# Tag frontend
docker tag blog-platform-frontend:latest ghcr.io/yourusername/blog-frontend:latest
docker tag blog-platform-frontend:latest ghcr.io/yourusername/blog-frontend:v1.0.0
```

### Step 4: Push to GitHub Container Registry

```bash
# Push backend
docker push ghcr.io/yourusername/blog-backend:latest
docker push ghcr.io/yourusername/blog-backend:v1.0.0

# Push frontend
docker push ghcr.io/yourusername/blog-frontend:latest
docker push ghcr.io/yourusername/blog-frontend:v1.0.0

# View packages in GitHub → Settings → Packages
```

## Automated CI/CD with GitHub Actions

The repository includes GitHub Actions workflows for automated testing and pushing.

### Workflows Included

#### 1. tests.yml (CI - Testing)
Triggers on: Push to `main` or `develop`, Pull Requests

```yaml
Jobs:
- Backend tests (Node.js + MongoDB)
- Frontend tests (React build)
- Docker build (validation only)
```

To use:
```bash
# Ensure .github/workflows/tests.yml exists
# Workflows run automatically on push/PR
# View results in GitHub → Actions tab
```

#### 2. docker-publish.yml (CD - Publishing)
Triggers on: Push to `main` or tags

```yaml
Jobs:
- Build backend image
- Build frontend image
- Push to GitHub Container Registry
```

To enable:
```bash
# 1. Commit workflow file
git add .github/workflows/docker-publish.yml
git commit -m "ci: add Docker publish workflow"
git push origin main

# 2. GitHub Actions automatically runs on next push
# 3. View results in Actions tab
# 4. Images appear in Packages section
```

## Deployment to Production

### Option 1: Docker Hub + Docker Swarm

```bash
# On production server with Docker Swarm
docker login
docker pull yourusername/blog-backend:v1.0.0
docker pull yourusername/blog-frontend:v1.0.0

# Use docker-compose.yml with image references
version: '3.8'
services:
  backend:
    image: yourusername/blog-backend:v1.0.0
    # ... other config
  frontend:
    image: yourusername/blog-frontend:v1.0.0
    # ... other config

# Deploy
docker-compose up -d
```

### Option 2: AWS ECR (Elastic Container Registry)

```bash
# Create ECR repositories
aws ecr create-repository --repository-name blog-backend
aws ecr create-repository --repository-name blog-frontend

# Login to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com

# Tag and push
docker tag blog-platform-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/blog-backend:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/blog-backend:latest

# Deploy with ECS
aws ecs create-service \
  --cluster blog-cluster \
  --service-name blog-backend \
  --task-definition blog-backend \
  --desired-count 1
```

### Option 3: Azure Container Registry

```bash
# Create ACR
az acr create --resource-group mygroup --name myblogregistry --sku Basic

# Login
az acr login --name myblogregistry

# Tag and push
docker tag blog-platform-backend:latest myblogregistry.azurecr.io/blog-backend:latest
docker push myblogregistry.azurecr.io/blog-backend:latest

# Deploy to Azure Container Instances or App Service
az container create \
  --resource-group mygroup \
  --name blog-backend \
  --image myblogregistry.azurecr.io/blog-backend:latest
```

### Option 4: Google Cloud Run

```bash
# Configure authentication
gcloud auth configure-docker

# Tag image
docker tag blog-platform-backend:latest gcr.io/myproject/blog-backend:latest

# Push to GCR
docker push gcr.io/myproject/blog-backend:latest

# Deploy
gcloud run deploy blog-backend \
  --image gcr.io/myproject/blog-backend:latest \
  --platform managed \
  --region us-central1
```

## Monitoring and Logging

### Local Development

```bash
# View container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongo

# Follow logs in real-time
docker-compose logs -f

# View specific lines
docker-compose logs -n 100 backend
```

### Production (Cloud)

Setup centralized logging:

**CloudWatch (AWS)**
```bash
# Push logs to CloudWatch
docker run -d \
  --log-driver awslogs \
  --log-opt awslogs-group=/ecs/blog-backend \
  yourusername/blog-backend:latest
```

**Application Insights (Azure)**
```bash
# Monitor performance and errors
# Add Application Insights SDK to Node.js
npm install applicationinsights
```

**Cloud Logging (Google Cloud)**
```bash
# Structured logging
# Use Winston or Bunyan for structured logs
npm install winston
```

## Updating Images

### Development Workflow

```bash
# 1. Make code changes
# Edit backend/server.js

# 2. Rebuild image
docker-compose build backend

# 3. Test locally
docker-compose up -d
docker-compose logs -f backend

# 4. Commit changes
git add backend/server.js
git commit -m "feat(backend): add new endpoint"
git push origin feature/new-feature

# 5. Create PR and get reviews
```

### Production Updates

```bash
# 1. Tag new version
docker tag blog-platform-backend:latest yourusername/blog-backend:v1.0.1

# 2. Push to registry
docker push yourusername/blog-backend:v1.0.1

# 3. Update deployment
# Update docker-compose.yml or Kubernetes manifest

# 4. Deploy to production
# kubectl apply -f deployment.yml
# or
# docker-compose pull && docker-compose up -d
```

## Health Checks and Monitoring

The Dockerfiles include health checks:

```yaml
# Backend health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', ...)"

# Frontend health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', ...)"
```

View health status:
```bash
# Check service health
docker ps --format "table {{.Names}}\t{{.Status}}"

# Inspect container health
docker inspect --format='{{.State.Health.Status}}' blog_backend
```

## Cleanup and Maintenance

```bash
# Remove unused images
docker image prune

# Remove unused containers
docker container prune

# Remove unused volumes
docker volume prune

# Full cleanup (WARNING: removes all unused resources)
docker system prune -a

# View disk usage
docker system df
```

## Troubleshooting

### Image Build Issues

```bash
# Increase verbosity
docker-compose build --verbose backend

# Build without cache
docker-compose build --no-cache backend

# Check Dockerfile syntax
docker build --check backend/
```

### Registry Connection Issues

```bash
# Test registry connection
docker info

# Check credentials
cat ~/.docker/config.json

# Re-login if needed
docker logout
docker login ghcr.io
```

### Image Runtime Issues

```bash
# Run container in interactive mode
docker run -it yourusername/blog-backend:latest bash

# View container logs
docker logs container-id

# Inspect container
docker inspect container-id
```

---

For more information, see the main [README.md](../README.md) and [GIT_WORKFLOW.md](../GIT_WORKFLOW.md) files.
