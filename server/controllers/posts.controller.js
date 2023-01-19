import Post from "../models/post.js"

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
    const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(postUpdated)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const deletePost = async(req, res) => {
  try {
    const postDeleted = await Post.findByIdAndDelete(req.params.id)
    if(!postDeleted) return res.status(404).json("Could not find this post")
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const createPost = async (req, res) => {
  try {
    const { title, author, body, date, category } = req.body
    const newPost = new Post({ title, author, body, date, category })
    await newPost.save()
    res.send(newPost)
  } catch (error) {
    return res.status(500).json(error)
  }
}