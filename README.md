# Blog Platform - Full Stack Web Application

This is a complete blog platform built with modern web technologies, containerized with Docker, and managed with Git for version control and collaboration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Docker & Containerization](#docker--containerization)
- [GitHub Workflow](#github-workflow)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

✅ **Full-Stack Application**
- Modern React frontend with responsive design
- Express.js backend with RESTful API
- MongoDB database for persistent storage
- Real-time backend health checks

✅ **Core Functionality**
- Create, Read, Update, and Delete (CRUD) blog posts
- Author attribution for each post
- Timestamp tracking (creation and update dates)
- Tag support for organizing posts
- Input validation and error handling

✅ **DevOps & Deployment**
- Docker containerization for all services
- Docker Compose for multi-container orchestration
- Health checks for all services
- Volume management for data persistence
- Network isolation using Docker networks

✅ **Version Control & Collaboration**
- Git-based workflow with branching strategy
- Pull request template for code review
- GitHub Actions for CI/CD (optional)
- Detailed commit history for tracking changes

## Tech Stack

### Frontend
- **React 18**: Modern UI library
- **Axios**: HTTP client for API calls
- **CSS3**: Responsive styling

### Backend
- **Node.js 18**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **CORS**: Cross-Origin Resource Sharing

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Alpine Linux**: Lightweight base images

## Project Structure

```
blog-platform/
├── backend/                    # Node.js Express API
│   ├── server.js              # Main application file
│   ├── package.json           # Node.js dependencies
│   ├── .env                   # Environment variables
│   ├── Dockerfile             # Backend container configuration
│   └── .dockerignore          # Docker build exclusions
├── frontend/                   # React application
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── App.css            # Application styles
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── package.json           # React dependencies
│   ├── .env                   # Environment variables
│   ├── Dockerfile             # Frontend container configuration
│   └── .dockerignore          # Docker build exclusions
├── docker-compose.yml         # Multi-container orchestration
├── .gitignore                 # Git exclusions
├── README.md                  # This file
└── .github/
    └── workflows/             # GitHub Actions (optional)

```

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Git** (v2.0+)
   - [Download](https://git-scm.com/downloads)
   - Verify: `git --version`

2. **Docker** (v20.10+)
   - [Download](https://www.docker.com/products/docker-desktop)
   - Verify: `docker --version`

3. **Docker Compose** (v2.0+)
   - Usually included with Docker Desktop
   - Verify: `docker-compose --version`

4. **Node.js** (v18+, optional for local development)
   - [Download](https://nodejs.org/)
   - Verify: `node --version`

5. **GitHub Account** (for version control)
   - [Create Account](https://github.com/join)

## Installation

### Step 1: Clone or Initialize the Repository

```bash
# Option A: Clone from GitHub (if repo already exists)
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform

# Option B: Initialize new repository
cd blog-platform
git init
git add .
git commit -m "Initial commit: Full-stack blog platform"
```

### Step 2: Configure Remote Repository (if new)

```bash
# Create new repository on GitHub, then:
git remote add origin https://github.com/yourusername/blog-platform.git
git branch -M main
git push -u origin main
```

### Step 3: Set Up Local Environment

```bash
# Copy environment variables (already included, but review them)
cat .env                    # Check backend config
cat frontend/.env          # Check frontend config
```

## Development

### Local Development (Without Docker)

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server (with nodemon for auto-reload)
npm run dev

# Server runs at http://localhost:5000
# API available at http://localhost:5000/api
```

#### Frontend Setup

```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# App opens at http://localhost:3000
```

#### MongoDB Setup (Local)

For local MongoDB setup without Docker:
```bash
# Install MongoDB Community Edition from https://docs.mongodb.com/manual/installation/
# Start MongoDB service (Windows):
mongod

# Or on macOS (if installed via Homebrew):
brew services start mongodb-community
```

### Docker Development

#### Build and Run All Services

```bash
# Navigate to project root
cd blog-platform

# Build all Docker images
docker-compose build

# Start all services
docker-compose up -d

# Access the application:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongo
```

#### Useful Docker Compose Commands

```bash
# Stop all services
docker-compose down

# Remove containers and volumes (WARNING: deletes data)
docker-compose down -v

# Restart services
docker-compose restart

# Rebuild a specific service
docker-compose build backend

# Execute command in running container
docker-compose exec backend npm install

# View service status
docker-compose ps

# View resource usage
docker stats
```

## Docker & Containerization

### Understanding the Architecture

#### Backend Dockerfile
- **Image**: `node:18-alpine` (lightweight Node.js)
- **Port**: 5000
- **Health Check**: HTTP GET to `/api/health`
- **Production Mode**: Dependencies installed with `--only=production`

#### Frontend Dockerfile
- **Multi-stage Build**: Optimizes final image size
  - Stage 1: Builds React app (includes build tools)
  - Stage 2: Runs optimized app with `serve` (minimal final image)
- **Image**: `node:18-alpine` with `serve` package
- **Port**: 3000
- **Health Check**: HTTP GET to `/`

#### MongoDB Service
- **Image**: `mongo:5.0-alpine`
- **Volume**: `mongo_data` (persists database between container restarts)
- **Health Check**: MongoDB ping command

### Service Communication

Services communicate through a Docker network named `blog-network`:

```
Frontend (port 3000)
    ↓ (REST API calls)
Backend (port 5000)
    ↓ (Mongoose driver)
MongoDB (port 27017)
```

### Building and Pushing Images

#### Build Images

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

#### Tag Images for Registry

```bash
# Tag backend image for Docker Hub
docker tag blog-platform-backend:latest yourdockerhubusername/blog-backend:latest
docker tag blog-platform-backend:latest yourdockerhubusername/blog-backend:v1.0.0

# Tag frontend image
docker tag blog-platform-frontend:latest yourdockerhubusername/blog-frontend:latest
docker tag blog-platform-frontend:latest yourdockerhubusername/blog-frontend:v1.0.0
```

#### Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Push backend image
docker push yourdockerhubusername/blog-backend:latest
docker push yourdockerhubusername/blog-backend:v1.0.0

# Push frontend image
docker push yourdockerhubusername/blog-frontend:latest
docker push yourdockerhubusername/blog-frontend:v1.0.0
```

#### Push to GitHub Container Registry

```bash
# Login to GitHub Container Registry
docker login ghcr.io -u yourusername

# Tag for GitHub
docker tag blog-platform-backend:latest ghcr.io/yourusername/blog-backend:latest
docker tag blog-platform-frontend:latest ghcr.io/yourusername/blog-frontend:latest

# Push to GitHub
docker push ghcr.io/yourusername/blog-backend:latest
docker push ghcr.io/yourusername/blog-frontend:latest
```

## GitHub Workflow

### Branch Strategy: Git Flow

```
main (production)
  ├── release branches (v1.0, v1.1, etc.)
  └── develop (staging)
      ├── feature branches (feature/user-auth, feature/tags, etc.)
      └── bugfix branches (bugfix/post-deletion, etc.)
```

### Step-by-Step Git Workflow

#### 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform

# Configure your Git identity
git config user.name "Your Name"
git config user.email "your.email@example.com"

# (Optionally set globally)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 2. Create Feature Branch

```bash
# Ensure you're on develop branch
git checkout develop
git pull origin develop

# Create and switch to feature branch
git checkout -b feature/add-user-authentication

# Naming conventions:
# feature/feature-description
# bugfix/bug-description
# hotfix/critical-issue
# docs/documentation-update
```

#### 3. Make Changes and Commit

```bash
# Check status
git status

# Stage specific files
git add backend/auth.js frontend/Login.js

# Or stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: add user authentication

- Implement JWT-based authentication
- Add login/signup endpoints
- Create authentication middleware"

# Commit message format:
# type(scope): subject
# types: feat, fix, docs, style, refactor, perf, test, chore
```

#### 4. Push to Remote

```bash
# Push to origin
git push origin feature/add-user-authentication

# For first push, use upstream tracking
git push -u origin feature/add-user-authentication
```

#### 5. Create Pull Request

On GitHub:
- Navigate to repository
- Click "Compare & pull request"
- Fill in PR title and description:
  ```
  Title: Add user authentication
  
  Description:
  Closes #123
  
  ## Changes
  - Implement JWT-based authentication
  - Add login/signup endpoints
  - Protect post creation with authentication
  
  ## Testing
  - [ ] Manual testing completed
  - [ ] No breaking changes
  ```
- Request reviewers
- Click "Create pull request"

#### 6. Code Review

Reviewers can:
- Comment on specific lines
- Request changes
- Approve changes

```bash
# While waiting for review, you can make updates
git add .
git commit -m "feat: add error handling to auth endpoints"
git push origin feature/add-user-authentication
```

#### 7. Merge to Develop

After approval:
- Click "Squash and merge" or "Create a merge commit"
- Delete the branch (GitHub will prompt)

```bash
# Locally, update develop
git checkout develop
git pull origin develop

# Delete local feature branch
git branch -d feature/add-user-authentication
```

#### 8. Release to Main

```bash
# Create release branch
git checkout -b release/v1.0.0

# Update version numbers, changelog, etc.
echo "v1.0.0" > VERSION

# Commit release changes
git commit -m "chore: bump version to 1.0.0"
git push -u origin release/v1.0.0

# Create PR from release to main
# After approval and merge:
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### Common Git Commands

```bash
# View commit history
git log --oneline -n 10
git log --graph --decorate --all

# View branch information
git branch -a
git branch -vv

# Sync with remote
git fetch origin
git pull origin main

# Undo recent changes
git reset HEAD~1                    # Undo last commit, keep changes
git reset --hard HEAD~1            # Undo last commit, discard changes
git revert HEAD                    # Create new commit that undoes last commit

# Stash changes temporarily
git stash
git stash pop

# Cherry-pick specific commits
git cherry-pick abc123def456

# Rebase for clean history
git rebase origin/develop
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Health Check
```
GET /health

Response (200):
{
  "status": "Backend is running!"
}
```

#### Get All Posts
```
GET /posts

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "First Blog Post",
    "content": "This is my first post...",
    "author": "John Doe",
    "tags": ["javascript", "nodejs"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### Get Single Post
```
GET /posts/:id

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "First Blog Post",
  "content": "This is my first post...",
  "author": "John Doe",
  "tags": ["javascript", "nodejs"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}

Response (404):
{
  "error": "Post not found"
}
```

#### Create Post
```
POST /posts

Request Body:
{
  "title": "New Post Title",
  "content": "Post content here...",
  "author": "Author Name",     // optional, defaults to "Anonymous"
  "tags": ["tag1", "tag2"]     // optional
}

Response (201):
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "New Post Title",
  "content": "Post content here...",
  "author": "Author Name",
  "tags": ["tag1", "tag2"],
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}

Response (400):
{
  "error": "Title and content are required"
}
```

#### Update Post
```
PUT /posts/:id

Request Body:
{
  "title": "Updated Title",
  "content": "Updated content...",
  "author": "Author Name",
  "tags": ["tag1", "tag2"]
}

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated Title",
  "content": "Updated content...",
  "author": "Author Name",
  "tags": ["tag1", "tag2"],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:30:00Z"
}
```

#### Delete Post
```
DELETE /posts/:id

Response (200):
{
  "message": "Post deleted successfully"
}

Response (404):
{
  "error": "Post not found"
}
```

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Get all posts
curl http://localhost:5000/api/posts

# Create post
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "Hello World!",
    "author": "Jane Doe"
  }'

# Get specific post
curl http://localhost:5000/api/posts/507f1f77bcf86cd799439011

# Update post
curl -X PUT http://localhost:5000/api/posts/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "content": "Updated content"
  }'

# Delete post
curl -X DELETE http://localhost:5000/api/posts/507f1f77bcf86cd799439011
```

## Contributing

We welcome contributions! Please follow these guidelines:

### 1. Fork the Repository
```bash
# Click "Fork" on GitHub to create your copy
```

### 2. Clone Your Fork
```bash
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform
```

### 3. Add Upstream Remote
```bash
git remote add upstream https://github.com/originalowner/blog-platform.git
```

### 4. Create Feature Branch
```bash
git checkout -b feature/your-feature
```

### 5. Make Changes
```bash
# Follow coding standards and include tests
git add .
git commit -m "feat: add your feature"
```

### 6. Sync with Upstream
```bash
git fetch upstream
git rebase upstream/main
```

### 7. Push to Your Fork
```bash
git push origin feature/your-feature
```

### 8. Create Pull Request
- Go to GitHub and create PR to the main repository
- Fill in PR template
- Wait for review

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
```bash
# Check if MongoDB container is running
docker-compose ps

# Restart MongoDB service
docker-compose restart mongo

# View MongoDB logs
docker-compose logs mongo
```

#### 2. Backend Cannot Connect to MongoDB
```bash
# Ensure connection string in .env is correct
MONGODB_URI=mongodb://mongo:27017/blog_platform

# Verify network connectivity
docker-compose exec backend ping mongo
```

#### 3. Frontend Cannot Connect to Backend
```bash
# Check API base URL in frontend/.env
REACT_APP_API_BASE=http://localhost:5000/api

# For Docker, use service name
REACT_APP_API_BASE=http://backend:5000/api

# Test backend availability
docker-compose exec frontend curl http://backend:5000/api/health
```

#### 4. Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
ports:
  - "3001:3000"  # Now use http://localhost:3001
```

#### 5. Clear Docker Cache
```bash
# Remove all stopped containers
docker container prune

# Remove dangling images
docker image prune

# Full cleanup (WARNING: removes all unused resources)
docker system prune -a
```

## Performance Optimization

### Frontend
- **Code Splitting**: Lazy load components
- **Caching**: Use service workers
- **Minification**: Build process handles this

### Backend
- **Database Indexing**: Add indexes on frequently queried fields
- **Pagination**: Implement for large result sets
- **Caching**: Implement Redis for session management

### Docker
- **Image Optimization**: Multi-stage builds reduce size
- **Layer Caching**: Order Dockerfile commands by change frequency
- **Resource Limits**: Set memory and CPU limits in docker-compose.yml

## Security Best Practices

1. **Environment Variables**: Never commit secrets
   ```
   .env files are in .gitignore
   ```

2. **Dependency Scanning**: Check for vulnerabilities
   ```bash
   npm audit
   npm audit fix
   ```

3. **Input Validation**: All endpoints validate input
4. **CORS Configuration**: Only allow trusted origins
5. **MongoDB**: Use authentication in production

## Deployment

### Prepare for Production

1. **Update Environment Variables**
   ```bash
   NODE_ENV=production
   ```

2. **Optimize Images**
   ```bash
   # Use alpine versions
   # Multi-stage builds
   # Minimize dependencies
   ```

3. **Set Resource Limits**
   ```yaml
   resources:
     limits:
       cpus: '1'
       memory: 512M
   ```

4. **Configure Logging**
   ```bash
   # Centralize logs
   # Monitor error rates
   ```

### Deploy to Cloud

Popular options:
- **Docker Hub + AWS ECS**
- **GitHub Container Registry + Azure Container Instances**
- **DigitalOcean App Platform** (automatic deployment)
- **Heroku** (free tier available)
- **Render** (easy Docker deployment)

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
- Open a GitHub Issue
- Create a Discussion
- Contact the maintainers

---

**Happy Coding! 🚀**
