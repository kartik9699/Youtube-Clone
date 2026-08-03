import { 
  getAllVideos, 
  getVideoById, 
  updateVideo, 
  deleteVideo 
} from "../Controller/video.controller.js";
import { verifyToken } from "../middleware/Auth.middleware.js";

export function videoRoutes(app) {
  app.get("/videos", getAllVideos);
  app.get("/videos/:videoId", getVideoById);
  app.put("/videos/:videoId", verifyToken, updateVideo);
  app.delete("/videos/:videoId", verifyToken, deleteVideo);
}