import {v2 as cloudinary } from "cloudinary"
import { response } from "express"
import fs from "fs"
import { deflate } from "zlib"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// uploading

const uploadFileOnCloudinary = async (filePath) => {
    try {
        
        if (!filePath) return null

       const response = await cloudinary.uploader.upload(filePath , Option{
            resource__type: "auto"
        })
        console.log("Data successfully upladed on cloudinary", response, response.url);
        
    } catch (error) {
        fs.lutimesSync(filePath)
    }
}

export default uploadFileOnCloudinary;