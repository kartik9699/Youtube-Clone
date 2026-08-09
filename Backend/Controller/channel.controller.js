import Channel from "../Model/channel.model.js";
import Video from "../Model/videos.model.js";
import Comment from "../Model/comment.model.js";
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
     channelName: name,
      description:description,
      avatar:bannerUrl, 
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
    const channel = await Channel.findById(channelId).populate("videos");

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
//get logged-in user's own channel
export async function getMyChannel(req, res) {
  try {
    const userId = req.user.userId;

    const channel = await Channel.findOne({ owner: userId }).populate("videos");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

const subscriberCount = channel.subscribers ? channel.subscribers.length : 0;

    res.status(200).json({ channel, subscriberCount });
  } catch (error) {
    console.error("Error fetching my channel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//update channel details (owner only)
export async function updateChannel(req, res) {
  try {
    const { channelId } = req.params;
    const { name, description, bannerUrl } = req.body;
    const userId = req.user.userId;

    // Find the channel
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Verify the person editing is the owner
    if (channel.owner.toString() !== userId) {
      return res.status(403).json({ message: "You can only edit your own channel" });
    }

    // Update fields
    if (name !== undefined) channel.channelName = name.trim() || channel.channelName;
    if (description !== undefined) channel.description = description.trim();
    if (bannerUrl !== undefined) channel.avatar = bannerUrl.trim();

    await channel.save();

    res.status(200).json({ message: "Channel updated successfully", channel });
  } catch (error) {
    console.error("Error updating channel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
//delete channel and all its videos/comments (owner only)
export async function deleteChannel(req, res) {
  try {
    const { channelId } = req.params;
    const userId = req.user.userId;

    // Find the channel
    const channel = await Channel.findById(channelId).populate("videos");
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Verify the person deleting is the owner
    if (channel.owner.toString() !== userId) {
      return res.status(403).json({ message: "You can only delete your own channel" });
    }

    // Collect all video IDs belonging to this channel
    const videoIds = channel.videos.map((v) => v._id);

    // Delete all comments associated with those videos
    if (videoIds.length > 0) {
      await Comment.deleteMany({ videoId: { $in: videoIds } });
    }

    // Delete all the videos themselves
    if (videoIds.length > 0) {
      await Video.deleteMany({ _id: { $in: videoIds } });
    }

    // Delete the channel
    await Channel.findByIdAndDelete(channelId);

    res.status(200).json({ message: "Channel and its videos deleted successfully" });
  } catch (error) {
    console.error("Error deleting channel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
