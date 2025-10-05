import axios from 'axios';

import { handler } from '../src/functions/index';
import { uploadS3 } from '../src/functions/uploadS3';

import { invalidEvent, validEvent } from './mockData/index.mock';

jest.mock('axios');
jest.mock('../src/functions/uploadS3');

describe('getImage', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  test('Should be check if Lambda has URL', async () => {
    process.env.BUCKET = 'bucketS3';
    const result = await handler(invalidEvent);
    expect(result).toEqual('Invalid parameters. URL is missing');
  });

  test('Should be check if Lambda has Bucket', async () => {
    process.env.BUCKET = '';
    const result = await handler(validEvent);
    expect(result).toEqual('Invalid parameters. Bucket is missing');
  });

  test('Should be checked if there is an error when fetching image', async () => {
    process.env.BUCKET = 'bucketS3';
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Mocked fetch error'));

    await expect(handler(validEvent)).rejects.toThrow('Error fetching image');
  });

  test('Should upload image successfully', async () => {
    process.env.BUCKET = 'bucketS3';
    const mockImageURL = 'https://example.com/image.jpg';
    const mockBuffer = Buffer.from('mocked image data');
    const mockEvent = { body: JSON.stringify({ imageURL: mockImageURL }) };

    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockBuffer });
    const mockedUploadS3 = uploadS3 as jest.Mock;
    mockedUploadS3.mockResolvedValue({
      link: 'https://bucketS3.s3.amazonaws.com/image.jpg'
    });

    await handler(mockEvent);

    expect(mockedUploadS3).toHaveBeenCalledWith(
      'bucketS3',
      mockBuffer,
      'image.jpg'
    );
  });
});
