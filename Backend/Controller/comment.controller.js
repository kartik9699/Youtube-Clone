import Comment from "../Model/comment.model.js";
import Video from "../Model/videos.model.js";
import User from "../Model/user.model.js";
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

    // 3. Populate the author so the frontend can display it immediately
    const populated = await newComment.populate("author", "username email avatar");

    res.status(201).json({ message: "Comment added successfully", comment: populated });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//fetch video comment
export async function getVideoComments(req, res) {
  try {
    const { videoId } = req.params;

    
const comments = await Comment.find({ videoId })
      .populate("author", "username email avatar")
      .sort({ createdAt: -1 }); // Newest comments first

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//update comments 
export async function updateComment(req, res) {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user.userId;

    if (!text) {
      return res.status(400).json({ message: "Updated text is required" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to edit this comment" });
    }

    comment.text = text;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    //Remove the comment ID from the Video's comments array
    await Video.findByIdAndUpdate(comment.videoId, {
      $pull: { comments: commentId }
    });

    //Delete the comment document entirely
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}