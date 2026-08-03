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