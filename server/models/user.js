import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  userSince: {
    type: Date,
    required: true,
    default: Date.now
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Post'
  }]
})

export default mongoose.model('User', userSchema, 'PostsPortfolioUsers')