
import * as path from 'path';

import axios from 'axios';

import { uploadS3 } from './uploadS3';

export async function getImage(imgURL: string, bucket: string) {

  try {
    const responseAxiosImg = await axios.get(imgURL,  { responseType: 'arraybuffer' });
    const bufferImg = Buffer.from(responseAxiosImg.data, 'utf-8');
    const ImgFileName = path.basename(imgURL);

    return await uploadS3(bucket, bufferImg, ImgFileName);
  }
  catch{
    throw new Error('Error fetching image');
  }
}
