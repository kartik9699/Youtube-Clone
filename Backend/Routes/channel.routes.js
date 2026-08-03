import { verifyToken } from "../middleware/Auth.middleware.js";
import { createChannel,getChannel } from "../Controller/channel.controller.js";
export function channelRoutes(app) {
  //Create a new channel
  app.post("/channels", verifyToken, createChannel);
  //Get channel details and its videos
  app.get("/channels/:channelId", getChannel);
}