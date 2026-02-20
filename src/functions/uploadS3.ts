import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const isLocal = process.env.IS_LOCAL === 'true';

const s3 = new S3Client({
  region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1',
  ...(isLocal
    ? {
      endpoint: process.env.AWS_ENDPOINT_URL || 'http://localhost:4566',
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test'
      }
    }
    : {})
});

export async function uploadS3(bucket, bufferImg, ImgFileName) {
  try {
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: ImgFileName,
      Body: bufferImg
    }));

    return {
      link: `https://${bucket}.s3.amazonaws.com/${ImgFileName}`
    };
  } catch (error) {
    console.log('Error to do S3 upload', error);
    throw new Error('S3 upload failed');
  }
}
