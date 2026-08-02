import mongoose from 'mongoose';
const { Schema } = mongoose;

const channelSchema = new Schema({
  channelName: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: "Video"
  }],
  
  description: {
    type: String,
    default: ""
  },
  avatar: {
    type: String,
    default: "" 
  }
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;