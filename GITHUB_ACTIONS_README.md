# GitHub Actions CI/CD Pipeline

This repository includes a comprehensive CI/CD pipeline that automatically builds, tests, and deploys your Todo application using GitHub Actions and Docker.

## Features

- **Automated Testing**: Runs linting and tests for both frontend and backend
- **Multi-platform Docker Builds**: Builds Docker images for both AMD64 and ARM64 architectures
- **Security Scanning**: Uses Trivy to scan Docker images for vulnerabilities
- **Automatic Deployment**: Deploys to production on main branch pushes
- **Environment-specific Deployments**: Different behavior for main and develop branches

## Setup Instructions

### 1. GitHub Secrets Configuration

You need to set up the following secrets in your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following repository secrets:

```
DOCKER_USERNAME    # Your Docker Hub username
DOCKER_PASSWORD    # Your Docker Hub password or access token
```

### 2. Optional: Remote Server Deployment

If you want to deploy to a remote server, also add these secrets:

```
HOST              # Your server's IP address or hostname
USERNAME          # SSH username for your server
SSH_KEY           # Your private SSH key for server access
```

Then uncomment and configure the remote deployment step in the workflow file.

## Workflow Triggers

The pipeline runs on:
- **Push to main branch**: Full pipeline (test → build → deploy)
- **Push to develop branch**: Test and build only
- **Pull requests to main**: Test only

## Pipeline Stages

### 1. Test Stage
- Sets up Node.js environment
- Installs dependencies for both frontend and backend
- Runs linting (ESLint)
- Runs tests (or basic syntax checking if no tests exist)
- Builds frontend to verify successful compilation

### 2. Build and Push Stage
- Builds Docker images for both services
- Pushes to Docker Hub with appropriate tags
- Uses multi-platform builds (AMD64 + ARM64)
- Implements layer caching for faster builds

### 3. Deploy Stage (main branch only)
- Creates production docker-compose configuration
- Can be extended to deploy to remote servers

### 4. Security Scan Stage
- Scans Docker images for vulnerabilities using Trivy
- Uploads results to GitHub Security tab

## Docker Images

The pipeline creates the following Docker images:
- `your-username/todo-backend:latest`
- `your-username/todo-frontend:latest`

Images are tagged with:
- `latest` (for main branch)
- Branch name
- `{branch}-{commit-sha}`

## Local Development

### Running Tests Locally
```bash
# Backend
cd Backend
npm install
npm test

# Frontend
cd Frontend
npm install
npm run lint
npm run build
```

### Building Docker Images Locally
```bash
# Backend
docker build -t todo-backend ./Backend

# Frontend (development)
docker build -t todo-frontend ./Frontend

# Frontend (production)
docker build -f Frontend/Dockerfile.prod -t todo-frontend-prod ./Frontend
```

## Production Deployment

### Using Docker Compose

The pipeline generates a `docker-compose.prod.yml` file. To deploy:

```bash
# Pull latest images
docker-compose -f docker-compose.prod.yml pull

# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Manual Deployment Steps

1. Ensure your server has Docker and Docker Compose installed
2. Copy the `docker-compose.prod.yml` to your server
3. Set environment variables:
   ```bash
   export MONGO_ROOT_USERNAME=your_mongo_user
   export MONGO_ROOT_PASSWORD=your_mongo_password
   ```
4. Run the deployment commands above

## Environment Variables

### Backend
- `NODE_ENV`: Set to "production" for production deployments
- `MONGODB_URI`: MongoDB connection string

### Frontend
- `VITE_API_URL`: Backend API URL for the frontend

### MongoDB
- `MONGO_INITDB_ROOT_USERNAME`: MongoDB admin username
- `MONGO_INITDB_ROOT_PASSWORD`: MongoDB admin password

## Monitoring and Logs

View application logs:
```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f mongodb
```

## Troubleshooting

### Common Issues

1. **Build Failures**: Check the Actions tab for detailed error messages
2. **Docker Push Failures**: Verify Docker Hub credentials in GitHub secrets
3. **Deployment Issues**: Check server connectivity and Docker daemon status

### Debugging

1. **Local Testing**: Run the same commands locally to reproduce issues
2. **GitHub Actions Logs**: Check the detailed logs in the Actions tab
3. **Docker Logs**: Use `docker logs <container-name>` to debug runtime issues

## Security Considerations

- Docker images are scanned for vulnerabilities
- Security headers are configured in nginx
- MongoDB requires authentication in production
- Secrets are properly managed through GitHub Secrets

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Push to your branch (triggers test pipeline)
4. Create a pull request to `main` (triggers test pipeline)
5. Merge to `main` (triggers full deployment pipeline)
