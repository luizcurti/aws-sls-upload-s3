.PHONY: help setup start stop restart logs deploy-local test-local clean status

# Default target
help: ## Show this help
	@echo "🚀 LocalStack Development Commands"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## Configure and start LocalStack environment
	@./scripts/setup-localstack.sh

start: ## Start only the containers
	@echo "🐳 Starting LocalStack..."
	@docker compose --env-file .env.local up -d
	@echo "✅ LocalStack started at http://localhost:4566"

stop: ## Stop the containers
	@echo "🛑 Stopping LocalStack..."
	@docker compose --env-file .env.local down
	@echo "✅ LocalStack stopped"

restart: stop start ## Restart the containers

logs: ## Show container logs
	@docker compose --env-file .env.local logs -f

status: ## Check LocalStack status
	@echo "🔍 LocalStack status:"
	@curl -s http://localhost:4566/health | jq . 2>/dev/null || echo "❌ LocalStack is not responding"

deploy-local: ## Deploy to LocalStack
	@echo "📦 Deploying locally..."
	@IS_LOCAL=true npm run deploy:local

test-local: ## Run tests against LocalStack
	@echo "🧪 Running local tests..."
	@IS_LOCAL=true npm run test:local

clean: ## Remove all data and containers
	@echo "🧹 Cleaning LocalStack environment..."
	@docker compose --env-file .env.local down -v
	@docker system prune -f
	@rm -rf ./tmp/localstack
	@echo "✅ Environment cleaned"

dev: setup deploy-local ## Setup complete development environment
	@echo "🎉 Development environment ready!"