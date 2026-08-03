import { verifyToken } from "../middleware/Auth.middleware";
import { createChannel,getChannel } from "../Controller/channel.controller";
export function channelRoutes(app) {
  //Create a new channel
  app.post("/api/channels", verifyToken, createChannel);
  //Get channel details and its videos
  app.get("/api/channels/:channelId", getChannel);
}