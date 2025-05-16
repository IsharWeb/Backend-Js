import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// uploading

const uploadFileOnCloudinary = async (filePath) => {
    try {

        if (!filePath) return null
        // upload on cloudinary
        const response = await cloudinary.uploader.upload(filePath, {
            resource__type: "auto"
        })
        console.log("Data successfully upladed on cloudinary", response, response.url);
        return response

    } catch (error) {
        // delete
        fs.unlinkSync(filePath)
        return null;

    }
}

export default uploadFileOnCloudinary;