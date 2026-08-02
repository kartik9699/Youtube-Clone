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
//single video using id
export async function getVideoById(req, res) {
  try {
    const { videoId } = req.params;

    // 1. Find the video and increment the 'views' count by 1 atomically
    const video = await Video.findByIdAndUpdate(
      videoId,
      { $inc: { views: 1 } },
      { new: true } // Returns the updated document with the new view count
    ).populate("uploader", "username profilePic");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching video" });
  }
}
