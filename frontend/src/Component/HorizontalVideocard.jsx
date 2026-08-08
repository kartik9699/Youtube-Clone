import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HorizontalVideocard({ video }) {
  const [channel, setChannel] = useState();

  useEffect(() => {
    async function fetchChannel() {
      try {
        const response = await axios(`http://localhost:3000/channels/${video.channelId}`);
        setChannel(response?.data?.channel);
      } catch (error) {
        console.error("Failed to fetch channel", error);
      }
    }
    
    if (video?.channelId) {
      fetchChannel();
    }
  }, [video?.channelId]);

  return (
    <div className="flex flex-row gap-3 p-3 bg-[#F6EFE9] w-full max-w-[600px] font-sans rounded-xl hover:bg-[#ece2d8] transition-colors cursor-pointer">
      
      {/* Thumbnail Section */}
      <Link to={`/watch/${video._id}`}>
      <div className="relative shrink-0 w-36 sm:w-44 aspect-video rounded-xl overflow-hidden bg-gray-200">
        <img 
          src={video?.thumbnailUrl} 
          alt={video?.title} 
          className="w-full h-full object-cover"
        />
      </div>
</Link>
      {/* Details Section */}
      
      <div className="flex flex-col flex-1 min-w-0 py-0.5"> 
        {/* min-w-0 is required here so the title truncates properly instead of stretching the flex container */}
        <Link to={`/watch/${video._id}`}>
        <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-tight line-clamp-2">
          {video?.title}
        </h3>
        </Link>
<Link to={`/channel/${channel?._id}`} className="text-xs sm:text-[13px] text-gray-600 mt-1.5 truncate hover:text-gray-900 transition-colors">
          {channel?.channelName || "Loading..."}
        </Link>
        
        <div className="text-xs sm:text-[13px] text-gray-600 flex items-center gap-1.5 mt-0.5 truncate">
          <span>{video?.views} views</span>
        </div>
      </div>
      
    </div>
  );
}

export default HorizontalVideocard;