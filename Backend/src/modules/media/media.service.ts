import { cloudinary } from "../../config/cloudinary";
import { env } from "../../config/env";
import { ApiError } from "../../utils/api-error";
export const uploadImage = (file: Express.Multer.File) => new Promise<{ url: string; publicId: string }>((resolve, reject) => {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    reject(new ApiError(503, "Cloudinary n'est pas configuré.", "MEDIA_PROVIDER_NOT_CONFIGURED"));
    return;
  }
  const stream = cloudinary.uploader.upload_stream({ folder: "the-shield-store/products", resource_type: "image" }, (error, result) => {
    if (error || !result) return reject(new ApiError(502, "Échec de l’envoi de l’image.", "IMAGE_UPLOAD_FAILED"));
    resolve({ url: result.secure_url, publicId: result.public_id });
  });
  stream.end(file.buffer);
});
export const deleteImage = async (publicId: string) => { await cloudinary.uploader.destroy(publicId, { resource_type: "image" }); };
