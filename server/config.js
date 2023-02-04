import dotenv from 'dotenv'

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI
export const CLOUDNAME = process.env.CLOUDNAME 
export const API_KEY = process.env.API_KEY
export const API_SECRET = process.env.API_SECRET
export const JWTSECRET = process.env.JWTSECRET
export const NODE_ENV = process.env.NODE_ENV || 'production'
export const PRODUCTION_URI = process.env.PRODUCTION_URI || 'http://localhost:5173'
export const PORT = process.env.PORT || 4000