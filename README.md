# AWS S3 Image Upload (Serverless)

A Serverless TypeScript application that receives an `imageURL`, downloads the image, and uploads it to an S3 bucket using AWS SDK v3.

## Stack

- AWS Lambda + API Gateway HTTP API
- S3 (`@aws-sdk/client-s3`)
- Serverless Framework v4
- Jest + ESLint + TypeScript
- LocalStack (local development)

## Prerequisites

- Node.js `>= 20`
- npm
- Docker (for LocalStack)
- AWS CLI (local scripts)

## Instalação

```bash
npm install
cp .env.example .env.local
```

## Environment variables

Set these in `.env.local`:

- `S3_BUCKET_NAME`: target bucket
- `AWS_REGION` / `AWS_DEFAULT_REGION`: AWS region
- `IS_LOCAL=true`: for local LocalStack integration
- `AWS_ENDPOINT_URL=http://localhost:4566`: LocalStack endpoint

On deploy, `serverless.yml` injects `BUCKET_NAME` from `S3_BUCKET_NAME`.

## API

Endpoint:

- `POST /upload`

Request:

```json
{
  "imageURL": "https://example.com/image.jpg"
}
```

Success response (`200`):

```json
{
  "link": "https://<bucket>.s3.amazonaws.com/image.jpg"
}
```

Common errors:

- `400`: invalid body or missing `imageURL`
- `500`: bucket not configured or fetch/upload failure

## Local development

```bash
npm run localstack:setup
npm run deploy:local
```

Useful commands:

- `npm run docker:up`
- `npm run docker:down`
- `npm run docker:logs`
- `npm run localstack:status`

## Qualidade

- `npm run lint`
- `npm run lint:tsc`
- `npm test`
- `npm run test:coverage`
- `npm run validate`

## CI/CD

Pipeline defined in [.github/workflows/ci.yml](.github/workflows/ci.yml), running on `push` and `pull_request` for `main`.

### Job `test`

1. `npm install`
2. `npm run lint`
3. `npm run lint:tsc`
4. `npm run test:coverage`
5. Upload de cobertura para Codecov (não bloqueante)

### Job `build`

1. `npm install`
2. `npm run build:ci`

## Checklist local antes de PR

Run the same CI checks locally to avoid failures:

```bash
npm run lint
npm run lint:tsc
npm run test:coverage
npm run build:ci
```