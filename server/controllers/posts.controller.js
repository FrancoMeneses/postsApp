import Post from "../models/post.js"
import { uploadImage, deleteImage } from "../libs/cloudinary.js"
import fs from 'fs-extra'

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.send(post)
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

export const updatePost = async(req, res) => {
  try {
    if(req.body.comments){
      const postUpdated = await Post.findByIdAndUpdate(req.params.id, { "$push": { "comments": req.body.comments }}, { new: true })
      res.send(postUpdated)
    }else{
      const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.send(postUpdated)
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const deletePost = async(req, res) => {
  try {
    const postDeleted = await Post.findByIdAndDelete(req.params.id)
    if(!postDeleted) return res.status(404).json("Could not find this post")
    if(postDeleted.image.public_id){
      let r = await deleteImage(postDeleted.image.public_id)
  }
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const createPost = async (req, res) => {
  try {
    // const { title, author, body, date, category } = req.body
     const { title, author, body, description, date, category } = req.body
     let { tags } = req.body
     console.log(JSON.parse(req.body.tags))
     tags = JSON.parse(req.body.tags)
    let image
    if(req.files?.image){
      const result = await uploadImage(req.files.image.tempFilePath)
      await fs.remove(req.files.image.tempFilePath)
      console.log(req.files.image.tempFilePath)
      image = {
        url: result.secure_url,
        public_id : result.public_id
      }
      req.body.image = image
    }
    const newPost = new Post({ title, author, body, description, date, category, tags, image })
    await newPost.save()
    return res.json(newPost)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}