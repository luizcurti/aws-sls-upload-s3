# 🐳 LocalStack Development Guide

This project includes complete configuration for local development using LocalStack, allowing you to simulate AWS services without costs.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- AWS CLI installed
- Node.js 16+ and npm

### Quick Setup
```bash
# Option 1: Use Make (recommended)
make dev

# Option 2: Use npm scripts
npm run dev:start

# Option 3: Manual
./scripts/setup-localstack.sh
```

## 📋 Available Commands

### Via Makefile (recommended)
```bash
make help           # List all commands
make setup          # Configure and start LocalStack
make start          # Start containers
make stop           # Stop containers  
make restart        # Restart containers
make logs           # View logs in real-time
make status         # Check status
make deploy-local   # Deploy to LocalStack
make test-local     # Local tests
make clean          # Clean everything
make dev            # Complete development setup
```

### Via npm scripts
```bash
npm run docker:up         # Start LocalStack
npm run docker:down       # Stop LocalStack
npm run docker:logs       # View logs
npm run docker:restart    # Restart containers
npm run localstack:setup  # Complete setup
npm run deploy:local      # Local deploy
npm run test:local        # Local tests
npm run dev:start         # Complete environment
npm run dev:stop          # Stop environment
```

## 🔧 Configuration

### Environment Variables
The `.env.local` file is automatically created with:

```bash
# LocalStack
DEBUG=1
AWS_ENDPOINT_URL=http://localhost:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1

# S3
S3_BUCKET_NAME=upload-s3-bucket-local
```

### Available Services
- **S3** - Object storage
- **Lambda** - Serverless functions
- **API Gateway** - REST APIs
- **IAM** - Identity management
- **CloudWatch Logs** - Function logs

## 🎯 Local Endpoints

| Service | Endpoint |
|---------|----------|
| LocalStack Gateway | http://localhost:4566 |
| Health Check | http://localhost:4566/health |
| S3 Console | http://localhost:4566/s3 |

## 🧪 Development and Testing

### 1. Local Development
```bash
# Start environment
make dev

# Test function locally
curl http://localhost:4566/restapis/{api-id}/local/_user_request_/

# View function logs
make logs
```

### 2. Testing
```bash
# Normal unit tests
npm test

# Tests against LocalStack
npm run test:local

# Tests with coverage
npm run test:coverage
```

### 3. Local Deploy
```bash
# Complete deploy
npm run deploy:local

# Specific deploy
IS_LOCAL=true serverless deploy function --function uploadS3
```

## 🔍 Debug and Troubleshooting

### Check Status
```bash
make status
# or
curl http://localhost:4566/health
```

### View Logs
```bash
make logs
# or  
docker-compose logs -f localstack
```

### List Resources
```bash
# S3 Buckets
aws --endpoint-url=http://localhost:4566 s3 ls

# Lambda Functions
aws --endpoint-url=http://localhost:4566 lambda list-functions

# API Gateway APIs
aws --endpoint-url=http://localhost:4566 apigateway get-rest-apis
```

### Common Issues

#### LocalStack not responding
```bash
# Check if Docker is running
docker info

# Restart containers
make restart

# Check error logs
make logs
```

#### Bucket doesn't exist
```bash
# Create bucket manually
npm run localstack:create-bucket

# Or recreate environment
make clean && make dev
```

#### Permission errors
```bash
# LocalStack uses fake credentials by default
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
```

## 📁 File Structure

```
├── docker-compose.yml          # LocalStack configuration
├── .env.local                  # Environment variables
├── .env.example               # Configuration template
├── Makefile                   # Development commands
├── scripts/
│   └── setup-localstack.sh    # Initialization script
└── tmp/
    └── localstack/           # Persistent data (gitignored)
```

## 🔄 Development Workflow

1. **Start environment**: `make dev`
2. **Develop**: Edit code normally
3. **Test**: `npm run test:local`
4. **Deploy**: `npm run deploy:local`
5. **Debug**: `make logs` to see execution
6. **Stop**: `make stop` when finished

## 🚀 Production vs Local

| Aspect | Local (LocalStack) | Production (AWS) |
|---------|-------------------|------------------|
| Endpoint | localhost:4566 | aws.amazon.com |
| Credentials | test/test | Real IAM |
| Costs | Free | Pay-per-use |
| Persistence | Docker volume | Permanent |
| Performance | Limited | Complete |

## 🎉 Next Steps

1. Run `make dev` to start
2. Test functions with `npm run test:local`
3. Deploy with `npm run deploy:local`
4. Access http://localhost:4566/health to check status

For more details, check the [official LocalStack documentation](https://docs.localstack.cloud/).