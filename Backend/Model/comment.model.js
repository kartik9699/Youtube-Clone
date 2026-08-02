import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: "Video",
    required: true
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  dislikes: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true 
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;