import express from "express"
import postRoutes from './routes/posts.routes.js'
import { connectDB } from "./db.js"
import fileUpload from "express-fileupload"

const app = express()

// middlewares
app.use(express.json())
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './tmp'
}))

app.use(postRoutes)

connectDB()

app.listen(4000)
console.log('App in running on port 4000')

