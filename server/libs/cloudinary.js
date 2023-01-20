import { v2 as cloudinary } from 'cloudinary'
import { CLOUDNAME, API_KEY, API_SECRET } from '../config.js';

cloudinary.config({ 
  cloud_name: CLOUDNAME, 
  api_key: API_KEY, 
  api_secret: API_SECRET
})

export const uploadImage = async filepath => {
  return await cloudinary.uploader.upload(filepath, {
    folder : 'Portfolio/PostsApp'
  })
}

export const deleteImage = async publicId => {
  return await cloudinary.uploader.destroy(publicId)
}