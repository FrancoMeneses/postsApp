import { Router } from "express"
import { getPost, getPosts, updatePost, deletePost, createPost, login, createUser } from "../controllers/posts.controller.js"

const router = Router()

router.get('/posts/:id', getPost)
router.get('/posts/', getPosts)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)
router.post('/posts', createPost)
router.post('/login', login)
router.post('/newuser', createUser)

export default router