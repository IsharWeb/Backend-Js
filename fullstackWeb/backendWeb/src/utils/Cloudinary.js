import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file
const uploadFileOnCloudinary = async (filePath) => {
  if (!filePath) return null;

  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", 
    });

    console.log("✅ Uploaded to Cloudinary:", response.secure_url);
    return response;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);
    return null;
  } finally {
    // Always delete temp file (success or error)
    fs.unlink(filePath, (err) => {
      if (err) console.error("❌ Failed to delete temp file:", err);
      else console.log("🗑️ Temp file deleted:", filePath);
    });
  }
};

export { uploadFileOnCloudinary };
