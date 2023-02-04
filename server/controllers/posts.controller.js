import Post from "../models/post.js"
import User from "../models/user.js"
import { uploadImage, deleteImage } from "../libs/cloudinary.js"
import fs from 'fs-extra'
import { JWTSECRET, NODE_ENV } from "../config.js"
import jwt from "jsonwebtoken"
import { serialize, parse } from 'cookie'

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // console.log(post.user._id.toString())
    const user = await User.findById(post.user._id.toString())
    // console.log(user.username)
    // res.send(post)
    res.json({
      post: post,
      username: user.username
    })
  } catch (error) {
    return res.status(404).json("Could not find this post")
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.send(posts)
  } catch (error) {
    return res.status(500).json('Error getPost')
  }
}

export const updatePost = async (req, res) => {
  try {
    if (req.body.comments) {
      const postUpdated = await Post.findByIdAndUpdate(req.params.id, { "$push": { "comments": req.body.comments } }, { new: true })
      res.send(postUpdated)
    } else {
      const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.send(postUpdated)
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const deletePost = async (req, res) => {
  try {
    const postDeleted = await Post.findByIdAndDelete(req.params.id)
    if (!postDeleted) return res.status(404).json("Could not find this post")
    if (postDeleted.image.public_id) {
      let r = await deleteImage(postDeleted.image.public_id)
    }
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const createPost = async (req, res) => {
  try {
    console.log(req.body)
    const { title, user, body, description, date, category } = req.body
    let { tags } = req.body
    tags = JSON.parse(req.body.tags)
    let image
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      await fs.remove(req.files.image.tempFilePath)
      console.log(req.files.image.tempFilePath)
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }
      req.body.image = image
    }
    const newPost = new Post({ title, user, body, description, date, category, tags, image })
    await newPost.save()
    await User.findOneAndUpdate(user, { "$push": { "posts": newPost._id } }, { new: true })
    return res.json(newPost)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const createUser = async (req, res) => {
  console.log('newuser controller')
  console.log(req.body)
  try {
    const { email, password } = req.body
    const username = email
    const user = new User({ email, password, username })
    await user.save()
    res.status(200).json({
      message: 'Create new user',
      user: user
    })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ 'email': email, 'password': password })
    if(user !== null) {
      if(req.headers.cookie){
        const cookie = parse(req.headers.cookie)
        try {
          const userSign = jwt.verify(cookie.tokenUser, JWTSECRET)
        return res.json({
          message: 'Login successfully',
          user: user
        })
        } catch (error) {
          return res.status(401).json({
            error: 'Invalid token'
          })
        }
      }else{
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
          email: user.email,
          username: user.username
        }, JWTSECRET)
  
        const serialized = serialize('tokenUser', token, {
          httpOnly: true,
          secure: NODE_ENV === 'production',
          SameSite: 'None',
          maxAge: 1000 + 60 * 60 * 24 * 1,
          path: '/'
        })
        res.append('Set-Cookie', serialized)
        return res.json({
          message: 'Login successfully',
          user: user
        })
      }
    }
    if(user === null) res.status(401).json({error: 'Invalid email or password'})
  } catch (error) {
    console.log(error)
  }
}