import cloudinary from "cloudinary";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "/public"); // Temporary directory
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing the file" });
    }

    const file = files.file[0]; // Access the uploaded file

    // Upload to Cloudinary
    cloudinary.uploader.upload(
      file.filepath,
      { upload_preset: "your_upload_preset" },
      (error, result) => {
        fs.unlinkSync(file.filepath); // Clean up the temporary file

        if (error) {
          return res
            .status(500)
            .json({ error: "Error uploading to Cloudinary" });
        }

        res.status(200).json(result);
      }
    );
  });
}
