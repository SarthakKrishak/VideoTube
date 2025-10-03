import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null
        }
        //uploading the file
      const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type:"auto"
            })
        // file has been uploaded
        console.log("File Uploaded Successfully !",response.url);
        return response;

    } catch (error) {
        //removing the file from the local system as well if not uploaded
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadOnCloudinary };