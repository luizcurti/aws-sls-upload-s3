# CI/CD Configuration Guide

## GitHub Actions Workflows

This project uses GitHub Actions for CI/CD with three main workflows:

### 1. CI (Continuous Integration) - `ci.yml`
- **Trigger**: Push to `main`/`develop` and Pull Requests to `main`
- **Runs**: Tests on Node.js 18.x and 20.x, linting, coverage
- **Artifacts**: Generates Serverless package

### 2. CD (Continuous Deployment) - `deploy.yml`
- **Trigger**: Push to `main` (automatic dev deploy) and manual workflow
- **Environments**: Development (automatic) and Production (manual)
- **Runs**: Tests + Deploy to AWS

### 3. PR Review - `pr.yml`
- **Trigger**: Pull Requests
- **Runs**: Complete validation with automatic comments

## Required Configuration

### 1. Repository Secrets
Configure the following secrets in GitHub (Settings > Secrets and variables > Actions):

#### For Development:
```
AWS_ACCESS_KEY_ID          # AWS access key for dev
AWS_SECRET_ACCESS_KEY      # AWS secret key for dev
AWS_REGION                 # AWS region (e.g., us-east-1)
```

#### For Production:
```
AWS_ACCESS_KEY_ID_PROD     # AWS access key for prod
AWS_SECRET_ACCESS_KEY_PROD # AWS secret key for prod
```

#### Optional (for coverage):
```
CODECOV_TOKEN              # Codecov token for coverage reports
```

### 2. Environments
Configure environments in GitHub (Settings > Environments):

#### Development Environment
- Name: `development`
- Protection rules: None (automatic deploy)

#### Production Environment  
- Name: `production`
- Protection rules:
  - ✅ Required reviewers (1-2 people)
  - ✅ Wait timer (optional: 5-10 minutes)
  - ✅ Restrict deployments to protected branches

### 3. Branch Protection
Configure protection for the `main` branch (Settings > Branches):
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
  - Required status checks: `test`, `build`, `pr-validation`
- ✅ Require up-to-date branches before merging
- ✅ Require conversation resolution before merging

## Workflow

### Development
1. Push to `main` → Automatic deployment to development
2. Or run manually: Actions > CD - Deploy to AWS > Run workflow > Select 'dev'

### Production
1. Run manually: Actions > CD - Deploy to AWS > Run workflow > Select 'prod'
2. Approval required (if configured)

### Pull Requests
1. Open PR → Automatic validation execution
2. Merge after approval → Automatic deploy to dev

## Available Scripts

```bash
npm test              # Run tests
npm run test:coverage # Tests with coverage
npm run build         # Serverless build
npm run lint          # TypeScript validation
npm run validate      # Lint + Tests
npm run deploy        # Default deploy
npm run deploy:dev    # Deploy to development
npm run deploy:prod   # Deploy to production
```

## Monitoring

- **CI Status**: Badges available in Actions
- **Coverage**: Codecov integration (if configured)
- **Deployments**: History in Actions > Deploy workflows
- **Environments**: Status in Settings > Environments