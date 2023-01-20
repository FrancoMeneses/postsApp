import dotenv from 'dotenv'

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI
export const CLOUDNAME = process.env.CLOUDNAME 
export const API_KEY = process.env.API_KEY
export const API_SECRET = process.env.API_SECRET