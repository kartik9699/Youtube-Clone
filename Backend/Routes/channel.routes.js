import { verifyToken } from "../middleware/Auth.middleware.js";
import { createChannel,getChannel,getMyChannel } from "../Controller/channel.controller.js";
export function channelRoutes(app) {
  //Create a new channel
  app.post("/channels", verifyToken, createChannel);
  //Get the logged-in user's own channel
  app.get("/channels/my", verifyToken, getMyChannel);
  //Get channel details and its videos (must be declared after /my so it isn't shadowed)
  app.get("/channels/:channelId", getChannel);
}
