import { verifyToken } from "../middleware/Auth.middleware.js";
import { createChannel,getChannel,getMyChannel,updateChannel,deleteChannel } from "../Controller/channel.controller.js";
export function channelRoutes(app) {
  //Create a new channel
  app.post("/channels", verifyToken, createChannel);
  //Get the logged-in user's own channel
  app.get("/channels/my", verifyToken, getMyChannel);
  //Get channel details and its videos 
  app.get("/channels/:channelId", getChannel);
  //Update channel details (owner only)
  app.put("/channels/:channelId", verifyToken, updateChannel);
  //Delete channel and all its videos (owner only)
  app.delete("/channels/:channelId", verifyToken, deleteChannel);
}
