import mongoose from 'mongoose';
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  views: {
    type: Number,
    default: 0,   
    min: 0
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
  },
  upload_date: {
    type: Date,
    default: Date.now 
  },
  
  
  uploader: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "Channel", 
    required: true
  },
  comments: Array

});

const Video = mongoose.model("Video", videoSchema);
export default Video;