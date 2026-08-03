import { addComment,getVideoComments,updateComment,deleteComment } from "../Controller/comment.controller";
import { verifyToken } from "../middleware/Auth.middleware";
export function commentRoutes(app) {
  app.post("/videos/:videoId/comments", verifyToken, addComment);
  app.get("/videos/:videoId/comments", getVideoComments);
  app.put("/comments/:commentId", verifyToken, updateComment);
  app.delete("/comments/:commentId", verifyToken, deleteComment);
}