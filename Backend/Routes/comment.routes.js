import { addComment,getVideoComments,updateComment,deleteComment } from "../Controller/comment.controller.js";
import { verifyToken } from "../middleware/Auth.middleware.js";
export function commentRoutes(app) {
  app.post("/videos/:videoId/comments", verifyToken, addComment);
  app.get("/videos/:videoId/comments", getVideoComments);
  app.put("/comments/:commentId", verifyToken, updateComment);
  app.delete("/comments/:commentId", verifyToken, deleteComment);
}