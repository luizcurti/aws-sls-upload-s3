import { getImage } from './getImage';

export const handler = (event) => {

  const { imageURL } = JSON.parse(event.body);

  return getImage(imageURL)
}