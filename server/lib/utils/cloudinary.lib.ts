import { v2 as cloudinary } from 'cloudinary';
import type { User } from '../../types/interfaces.types';

type ImageType = 'profileImage' | 'coverImage';

export async function uploadImage(image: string) {
  const uploadedResponse = await cloudinary.uploader.upload(image);
  return uploadedResponse.secure_url;
}

export function isImageExists(user: User, imageType: ImageType) {
  if (!imageType) throw new Error('Image Not Found');
  return Boolean(user[imageType]);
}

export async function destroyImage(user: User, imageType: ImageType) {
  const image = user[imageType];

  if (!image) throw new Error(`${imageType} not found`);

  const publicId = image.split('/').pop()?.split('.')[0];
  if (!publicId) throw new Error(`Invalid Cloudinary URL`);

  const destroyedResponse = await cloudinary.uploader.destroy(publicId);
  return destroyedResponse;
}
