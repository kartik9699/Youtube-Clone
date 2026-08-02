import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,     
    unique: true    
  }, 
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  avatar:{
    type:String,
  }
});
const User=mongoose.model("user",userSchema);
export default User