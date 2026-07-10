import { v2 as cloudinary } from 'cloudinary';
import type { Post, User } from '../../types/interfaces.types';

type DataType = User | Post;
export async function uploadImage(image: string) {
  const uploadedResponse = await cloudinary.uploader.upload(image);
  return uploadedResponse.secure_url;
}

export function isImageExists<T extends DataType, K extends keyof T & string>(
  dataType: T,
  imageType: K
) {
  if (!imageType) throw new Error('Image Not Found');
  return Boolean(dataType[imageType]);
}

export async function destroyImage<
  T extends DataType,
  K extends keyof T & string
>(dataType: T, imageType: K) {
  if (!dataType) {
  }
  const image = dataType[imageType] as string;
  if (!image) throw new Error(`${imageType} not found`);

  const publicId = image.split('/').pop()?.split('.')[0];
  if (!publicId) throw new Error(`Invalid Cloudinary URL`);

  const destroyedResponse = await cloudinary.uploader.destroy(publicId);
  return destroyedResponse;
}
