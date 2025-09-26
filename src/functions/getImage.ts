
import axios from 'axios';
import * as path from 'path'
import { uploadS3 } from './uploadS3';

export async function getImage(imgURL) {
        
  const bucket = process.env.BUCKET;

  if(imgURL === undefined || !imgURL){
    return 'Invalid parameters. URL is missing';
  }

  if(bucket === undefined || !bucket){
    return 'Invalid parameters. Bucket is missing';
  }

  try {
    const responseAxiosImg = await axios.get(imgURL,  { responseType: 'arraybuffer' })
    var bufferImg = Buffer.from(responseAxiosImg.data, "utf-8")
    var ImgFileName = path.basename(imgURL);

    uploadS3(bucket, bufferImg, ImgFileName)
  }
  catch(error){
    throw new Error("Error fetching image");
  }
};
