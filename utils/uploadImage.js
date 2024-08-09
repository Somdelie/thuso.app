// utils/uploadImage.js
import cloudinary from "./cloudinary";

export async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });

    file.pipe(upload);
  });
}
