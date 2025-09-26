# 📤 AWS S3 File Upload (Serverless)

This is a simple serverless application that allows you to upload files to an AWS S3 bucket using AWS Lambda, API Gateway, and Node.js.

## 📁 Project Structure


## 🚀 Features

- Upload base64-encoded files to S3
- Built with AWS SDK and Node.js
- Deployable with Serverless Framework
- Minimal setup, ready to use

## ☁️ Prerequisites

- Node.js >= 18
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started)
- AWS CLI configured (`aws configure`)

## 📦 Installation
- git clone https://github.com/luizcurti/aws-sls-upload-s3.git
- cd aws-sls-upload-s3
- npm install

Set your S3 bucket name in serverless.yml:

environment:
- BUCKET_NAME: your-bucket-name
(Optional) Create the bucket manually in S3 if it doesn't exist.

🧪 Local Testing
Install the local development plugin:
npm install --save-dev serverless-offline

Update your serverless.yml:
plugins:
  - serverless-esbuild
  - serverless-offline

Start the local server:
npx serverless offline

Make a POST request to http://localhost:3000/upload with the following JSON body:
{
  "filename": "example.txt",
  "contentType": "text/plain",
  "base64Data": "ZXhhbXBsZSBmaWxlIGNvbnRlbnQ="
}

🚀 Deployment
npx serverless deploy

After deployment, the endpoint URL will be printed in your terminal.

📤 Sample Payload

{
  "filename": "hello.txt",
  "contentType": "text/plain",
  "base64Data": "aGVsbG8gd29ybGQ="
}