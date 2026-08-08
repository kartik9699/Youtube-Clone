import { 
  createVideo,
  getAllVideos, 
  getVideoById, 
  updateVideo, 
  deleteVideo 
} from "../Controller/video.controller.js";
import { verifyToken } from "../middleware/Auth.middleware.js";

export function videoRoutes(app) {
  app.get("/videos", getAllVideos);
  app.post("/videos", verifyToken, createVideo);
  app.get("/videos/:videoId", getVideoById);
  app.put("/videos/:videoId", verifyToken, updateVideo);
  app.delete("/videos/:videoId", verifyToken, deleteVideo);
}