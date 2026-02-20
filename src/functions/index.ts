import type { APIGatewayProxyResult } from 'aws-lambda';

import { getImage } from './getImage';

type HandlerEvent = {
  body?: string | null;
};

function jsonResponse(statusCode: number, payload: unknown): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  };
}

export const handler = async (event: HandlerEvent): Promise<APIGatewayProxyResult> => {
  if (!event?.body) {
    return jsonResponse(400, { message: 'Invalid request body' });
  }

  let parsedBody: { imageURL?: string };

  try {
    parsedBody = JSON.parse(event.body);
  } catch {
    return jsonResponse(400, { message: 'Invalid request body' });
  }

  const { imageURL } = parsedBody;
  const bucket = process.env.BUCKET_NAME || process.env.S3_BUCKET_NAME || process.env.BUCKET;

  if (typeof imageURL !== 'string' || !imageURL.trim()) {
    return jsonResponse(400, { message: 'Invalid parameters. URL is missing' });
  }

  if (!bucket) {
    return jsonResponse(500, { message: 'Invalid parameters. Bucket is missing' });
  }

  try {
    const result = await getImage(imageURL, bucket);
    return jsonResponse(200, result);
  } catch (error) {
    return jsonResponse(500, {
      message: error instanceof Error ? error.message : 'Unexpected error'
    });
  }
};
