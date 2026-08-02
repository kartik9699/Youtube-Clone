import Video from "../Model/videos.model.js";
import User from "../Model/user.model.js";
import Comment from "../Model/comment.model.js";
import Channel from "../Model/channel.model.js";
//fetch all the videos
export async function getAllVideos(req, res) {
  try {
    // Fetch all videos, sort by newest, and get the uploader's username
    const videos = await Video.find()
      .populate("uploader", "username profilePic") 
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching videos" });
  }
}