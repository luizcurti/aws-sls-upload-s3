import { uploadS3 } from '../src/functions/uploadS3';

describe('uploadToS3', () => {
  it('Should throw an error when Upload S3 fails', async () => {
    const bucket = 'testBucket';
    const body = 'data';
    const key = 'testKey';

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(require('aws-sdk').S3.prototype, 'upload').mockImplementation(() => {
      return {
        promise: () => Promise.reject(new Error('Mocked upload error'))
      };
    });

    await expect(uploadS3(bucket, body, key)).rejects.toThrow('S3 upload failed');
  });

  it('Should return the correct link when upload succeeds', async () => {
    const bucket = 'testBucket';
    const body = 'data';
    const key = 'testKey';

    jest.spyOn(require('aws-sdk').S3.prototype, 'upload').mockImplementation(() => {
      return {
        promise: () => Promise.resolve()
      };
    });

    const result = await uploadS3(bucket, body, key);
    expect(result).toEqual({
      link: `https://${bucket}.s3.amazonaws.com/${key}`
    });
  });
});
