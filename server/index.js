import express from "express"
import postRoutes from './routes/posts.routes.js'
import { connectDB } from "./db.js"
import fileUpload from "express-fileupload"
import { PORT } from "./config.js"

const app = express()

// middlewares
app.use(express.json())
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './tmp'
}))

app.use(postRoutes)

connectDB()

app.listen(PORT)
console.log(`App in running on port ${PORT}`)

