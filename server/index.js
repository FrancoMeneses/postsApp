import express from "express"
import postRoutes from './routes/posts.routes.js'
import { connectDB } from "./db.js"
import fileUpload from "express-fileupload"
import { PORT, PRODUCTION_URI } from "./config.js"
import cors from 'cors';
import cookieParser from "cookie-parser"

const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './tmp'
}))

app.use(cors({
  credentials: true,
  origin: PRODUCTION_URI,
  optionsSuccessStatus: 200 
}))

app.use(postRoutes)

connectDB()

app.listen(PORT)
console.log(`App in running on port ${PORT}`)

