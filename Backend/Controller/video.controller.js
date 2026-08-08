import Video from "../Model/videos.model.js";
import User from "../Model/user.model.js";
import Comment from "../Model/comment.model.js";
import Channel from "../Model/channel.model.js";
//create a new video
export async function createVideo(req, res) {
  try {
    const { title, videoUrl, thumbnailUrl, description } = req.body;
    const userId = req.user.userId;

    //User must have a channel to upload a video
    const channel = await Channel.findOne({ owner: userId });
    if (!channel) {
      return res.status(400).json({ message: "You must create a channel before uploading a video." });
    }

    //validate required fields
    if (!title?.trim() || !videoUrl?.trim() || !thumbnailUrl?.trim()) {
      return res.status(400).json({ message: "Title, video URL and thumbnail URL are required." });
    }

    const newVideo = new Video({
      title: title.trim(),
      videoUrl: videoUrl.trim(),
      thumbnailUrl: thumbnailUrl.trim(),
      description: description?.trim() || "",
      uploader: userId,
      channelId: channel._id,
    });

    await newVideo.save();

    // Associate the video with the channel
    channel.videos.push(newVideo._id);
    await channel.save();

    res.status(201).json({ message: "Video uploaded successfully!", video: newVideo });
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//fetch all the videos
export async function getAllVideos(req, res) {
  try {
    const { q } = req.query;

    // Build a filter based on the optional search query (matches title, case-insensitive)
    const filter = q && q.trim() ? { title: { $regex: q.trim(), $options: "i" } } : {};

    // Fetch all videos, sort by newest
    const videos = await Video.find(filter)
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
    console.log("Looking for Video ID:", `"${videoId}"`);
    //Find the video and increment the 'views' count by 1 atomically
    // const video = await Video.findByIdAndUpdate(
    //   videoId,
    //   { $inc: { views: 1 } },
    //   { returnDocument: "after" } // Returns the updated document with the new view count
    // )
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching video" });
  }
}
//update the video details
export async function updateVideo(req, res) {
  try {
    const { videoId } = req.params;
    const { title, description, thumbnailUrl } = req.body;
    const userId = req.user.userId;

    // Find the video
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Verify the person editing is the uploader
    if (video.uploader.toString() !== userId) {
      return res.status(403).json({ message: "You can only edit your own videos" });
    }

    // Update fields
    video.title = title || video.title;
    video.description = description || video.description;
    video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;

    await video.save();

    res.status(200).json({ message: "Video updated successfully", video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating video" });
  }
}
//delete video
export async function deleteVideo(req, res) {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;

    // Find the video
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Verify the person deleting is the uploader
    if (video.uploader.toString() !== userId) {
      return res.status(403).json({ message: "You can only delete your own videos" });
    }

    //Delete all comments associated with this video
    await Comment.deleteMany({ videoId: videoId });

    //Remove video ID from the Channel's array
    if (video.channelId) {
      await Channel.findByIdAndUpdate(video.channelId, {
        $pull: { videos: videoId }
      });
    }

    // delete the video 
    await Video.findByIdAndDelete(videoId);

    res.status(200).json({ message: "Video and its comments deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting video" });
  }
}