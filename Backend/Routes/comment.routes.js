import Comment from "../Model/comment.model.js";
import Video from "../Model/videos.model.js";
export async function addComment(req, res) {
  try {
    const { videoId } = req.params;
    const { text } = req.body;
    const authorId = req.user.userId; // Extracted from verifyToken middleware

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    // 1. Create and save the comment
    const newComment = new Comment({
      text,
      author: authorId,
      videoId: videoId
    });
    
    await newComment.save();

    // 2. Push the comment ID into the Video's comments array
    await Video.findByIdAndUpdate(videoId, {
      $push: { comments: newComment._id }
    });

    res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}