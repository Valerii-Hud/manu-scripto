import { v2 as cloudinary } from 'cloudinary';

type ImageData = {
  image?: string | null;
  profileImage?: string | null;
  coverImage?: string | null;
};

export async function uploadImage(image: string) {
  const uploadedResponse = await cloudinary.uploader.upload(image);
  return uploadedResponse.secure_url;
}

export function isImageExists(dataType: ImageData, imageType: keyof ImageData) {
  if (!imageType) throw new Error('Image Not Found');
  return Boolean(dataType[imageType]);
}

export async function destroyImage(
  imageData: ImageData,
  imageType: keyof ImageData
) {
  if (!imageData) {
  }
  const image = imageData[imageType] as string;
  if (!image) throw new Error(`${imageType} not found`);

  const publicId = image.split('/').pop()?.split('.')[0];
  if (!publicId) throw new Error(`Invalid Cloudinary URL`);

  const destroyedResponse = await cloudinary.uploader.destroy(publicId);
  return destroyedResponse;
}
