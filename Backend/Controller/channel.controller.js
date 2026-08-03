import Channel from "../Model/channel.model.js";
import User from "../Model/user.model.js";
//creating a channel 
export async function createChannel(req, res) {
  try {
    const { name, description, bannerUrl } = req.body;
    const userId = req.user.userId;

    // Check if the user already has a channel 
    const existingChannel = await Channel.findOne({ owner: userId });
    if (existingChannel) {
      return res.status(400).json({ message: "You already have a channel." });
    }

    const newChannel = new Channel({
      name,
      description,
      bannerUrl, 
      owner: userId
    });

    await newChannel.save();

    res.status(201).json({ message: "Channel created successfully!", channel: newChannel });
  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//get channel info
export async function getChannel(req, res) {
  try {
    const { channelId } = req.params;

    // Fetch the channel and populate its videos and the owner's details
    const channel = await Channel.findById(channelId)
      .populate("owner", "username profilePic")
      .populate({
        path: "videos",
        options: { sort: { createdAt: -1 } } // Load newest videos first
      });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Add a subscriber count dynamically
    const subscriberCount = channel.subscribers ? channel.subscribers.length : 0;

    res.status(200).json({ channel, subscriberCount });
  } catch (error) {
    console.error("Error fetching channel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}