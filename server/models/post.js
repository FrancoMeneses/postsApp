import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  comments: [
    {
      body: String, 
      date: Date,
      default: Date.now 
    }
  ],
  date: { 
    type: Date,
    required: true,
    default: Date.now 
  },
  hidden: { 
    type: Boolean, 
    default: false
  },
  category: {
    type: String,
    required: true
  },
  image: {
    url: String,
    public_id: String
  }
})

export default mongoose.model('Post', postSchema, 'PostsPortfolio')