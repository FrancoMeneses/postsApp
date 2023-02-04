import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  comments: [
    {
      body: String, 
      date: Date
    }
  ],
  date: { 
    type: Date,
    required: true,
    default: Date.now 
  },
  description: { 
    type: String, 
    required: true
  },
  category: {
    type: String,
    required: false
  },
  tags: [String],
  image: {
    url: String,
    public_id: String
  }
})

export default mongoose.model('Post', postSchema, 'PostsPortfolio')