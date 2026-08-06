import { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { RiDownloadLine } from "react-icons/ri";
import { PiShareFat } from "react-icons/pi";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function VideoSection() {
  // 1. Initialize state with null instead of undefined
  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  // 2. Add loading and error states to prevent crashing
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { videoID } = useParams();

  // 3. Fetch the video details when the videoID param changes
  useEffect(() => {
    async function fetchVideoDetails() {
      try {
        setLoading(true);
        setError(false);
        const { data } = await axios.get(`http://localhost:3000/videos/${videoID}`);
        setVideo(data);
      } catch (err) {
        console.error("Failed to fetch video:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (videoID) {
      fetchVideoDetails();
    }
  }, [videoID]);

  // 4. Fetch the channel details once we have the video's channelId
  useEffect(() => {
    async function fetchChannel() {
      try {
        const { data } = await axios.get(`http://localhost:3000/channels/${video.channelId}`);
        // getChannel returns { channel, subscriberCount }
        setChannel(data.channel);
      } catch (err) {
        console.error("Failed to fetch channel:", err);
      }
    }

    if (video?.channelId) {
      fetchChannel();
    }
  }, [video?.channelId]);

  // 5. Early return if still loading (prevents the crash)
  if (loading) {
    return <div className="text-white p-4">Loading video details...</div>;
  }

  // 6. Early return if API gave a 404 error
  if (error || !video) {
    return <div className="text-white p-4 text-xl font-bold">404 - Video Not Found!</div>;
  }

  // 7. Format the upload date safely
  const formattedDate = video.upload_date
    ? new Date(video.upload_date).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-[90%] md:w-[70%]">
      {/* Video Player */}
      <VideoPlayer videoUrl={video.videoUrl} />

      {/* Video Title */}
      <h1 className="text-lg sm:text-xl font-bold line-clamp-2 px-4 sm:px-0">
        {video.title}
      </h1>

      {/* Channel Info & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-0">

        {/* Channel Info & Subscribe button */}
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex-shrink-0"></div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                {channel?.channelName || "Unknown Channel"}
              </h3>
              <p className="text-xs text-gray-400">
                {channel?.subscriber ?? 0} subscribers
              </p>
            </div>
          </div>
          <button className="ml-2 sm:ml-4 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-400 flex-shrink-0 transition-colors">
            Subscribe
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto overflow-x-auto scrollbar-hide pb-2 sm:pb-0 text-black">
          <div className="flex bg-[#E6E6E6] rounded-full overflow-hidden flex-shrink-0">
            <button className="px-4 py-2 hover:bg-gray-300 flex items-center gap-2 text-sm border-r border-gray-400 font-medium transition-colors">
              <SlLike /> {video.likes || 0}
            </button>
            <button className="px-4 py-2 hover:bg-gray-300 text-sm transition-colors">
              <SlDislike />
            </button>
          </div>
          <button className="px-4 py-2 bg-[#E6E6E6] hover:bg-gray-300 rounded-full text-sm flex items-center gap-2 font-medium flex-shrink-0 transition-colors">
            <PiShareFat /> Share
          </button>
          <button className="px-4 py-2 bg-[#E6E6E6] hover:bg-gray-300 rounded-full text-sm flex items-center gap-2 font-medium flex-shrink-0 hidden sm:flex transition-colors">
            <RiDownloadLine /> Download
          </button>
        </div>
      </div>

      {/* Description Box */}
      <div className="mx-4 sm:mx-0 bg-[#E6E6E6] text-black p-3 rounded-xl mt-2 text-sm">
        <p className="font-semibold">{video.views || 0} views • {formattedDate}</p>
        <p className="mt-2 text-gray-800">{video.description}</p>
      </div>
    </div>
  );
}
