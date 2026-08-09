import { 
  createVideo,
  getAllVideos, 
  getVideoById, 
  updateVideo, 
  deleteVideo 
} from "../Controller/video.controller.js";
import { verifyToken } from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

export function videoRoutes(app) {
  app.get("/videos", getAllVideos);
  app.post("/videos", verifyToken, upload.fields([{ name: "video", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }]), createVideo);
  app.get("/videos/:videoId", getVideoById);
  app.put("/videos/:videoId", verifyToken, upload.fields([{ name: "video", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }]), updateVideo);
  app.delete("/videos/:videoId", verifyToken, deleteVideo);
}
