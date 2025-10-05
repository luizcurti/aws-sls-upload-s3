#!/bin/bash

# LocalStack Setup Script
echo "🚀 Starting LocalStack for local development..."

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '#' | xargs)
    echo "✅ Environment variables loaded from .env.local"
else
    echo "⚠️  .env.local file not found. Copying from .env.example..."
    cp .env.example .env.local
fi

# Create directory for persistent data
mkdir -p ./tmp/localstack
echo "✅ Data directory created"

# Start LocalStack
echo "🐳 Starting containers..."
docker compose --env-file .env.local up -d

# Wait for LocalStack to be ready
echo "⏳ Waiting for LocalStack to initialize..."
timeout=60
elapsed=0

while [ $elapsed -lt $timeout ]; do
    if curl -s http://localhost:4566/health &> /dev/null; then
        echo "✅ LocalStack is running!"
        break
    fi
    sleep 2
    elapsed=$((elapsed + 2))
    echo -n "."
done

if [ $elapsed -ge $timeout ]; then
    echo "❌ Timeout: LocalStack didn't respond in ${timeout}s"
    exit 1
fi

# Configure local AWS resources
echo "🔧 Configuring local AWS resources..."

# Create S3 bucket
aws --endpoint-url=http://localhost:4566 s3 mb s3://${S3_BUCKET_NAME:-upload-s3-bucket-local} 2>/dev/null || echo "ℹ️  Bucket already exists"

# List created resources
echo ""
echo "📋 Available local AWS resources:"
echo "   S3 Buckets:"
aws --endpoint-url=http://localhost:4566 s3 ls 2>/dev/null || echo "   No buckets found"

echo ""
echo "🎉 LocalStack configured successfully!"
echo ""
echo "📍 Available endpoints:"
echo "   LocalStack Gateway: http://localhost:4566"
echo "   Health Check: http://localhost:4566/health"
echo ""
echo "🔧 Useful commands:"
echo "   npm run docker:logs     # View container logs"
echo "   npm run docker:down     # Stop LocalStack"
echo "   npm run deploy:local    # Deploy to LocalStack"
echo "   npm run test:local      # Test against LocalStack"