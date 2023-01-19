import express from "express"
import postRoutes from './routes/posts.routes.js'
import { connectDB } from "./db.js"

const app = express()

app.use(express.json())

app.use(postRoutes)

connectDB()

app.listen(4000)
console.log('App in running on port 4000')

