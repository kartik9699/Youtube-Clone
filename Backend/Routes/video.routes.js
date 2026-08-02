import { 
  uploadVideo, 
  getAllVideos, 
  getVideoById, 
  updateVideo, 
  deleteVideo 
} from "../Controller/video.controller.js";
import { verifyToken } from "../middleware/Auth.middleware.js";

export function videoRoutes(app) {
  app.get("/api/videos", getAllVideos);
  app.get("/api/videos/:videoId", getVideoById);
  app.put("/api/videos/:videoId", verifyToken, updateVideo);
  app.delete("/api/videos/:videoId", verifyToken, deleteVideo);
}