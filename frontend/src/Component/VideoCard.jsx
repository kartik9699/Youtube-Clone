import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { resolveMediaUrl } from '../Utils/videoUrl';

function VideoCard({ video,
  thumbnail = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=281&fit=crop", 
  channelAvatar = "https://ui-avatars.com/api/?name=JS&background=0D8ABC&color=fff", 
  title = "Building a YouTube Clone with React and Tailwind CSS - Full Course", 
  channelName = "Code with AI", 
  views = "120K views", 
  timestamp = "2 months ago",
  duration = "14:20"
}) {
    const [Channel,setChannel]=useState();

    

    useEffect(() => {
        async function fetchChannel() {
            try {
                const response = await axios(`http://localhost:3000/channels/${video.channelId}`);
                // 2. Just store the actual channel data, not the whole axios response
                console.log(response?.data?.channel); 
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
    <div className="flex flex-col gap-2 cursor-pointer transition-colors duration-300 hover:bg-gray-500/5  w-['100em']">
      
      {/* 1. Thumbnail Section - links to watch page */}
      <Link to={`/watch/${video._id}`} className="relative w-full block">
        <img 
          src={resolveMediaUrl(video.thumbnailUrl)} 
          alt="Video Thumbnail" 
          // group-hover slightly reduces the rounded corners on hover, just like YouTube!
          className="w-full aspect-video rounded-xl object-cover  transition-all duration-300"
        />
        
      </Link>

      {/* 2. Video Details Section */}
      <div className="flex gap-3 mt-1 pr-4">
        
{/* Channel Avatar */}
        <div className="shrink-0">
          <Link to={`/channel/${Channel?._id}`}>
            <img 
              src={Channel?.avatar} 
              alt="Channel" 
              className="w-9 h-9 rounded-full object-cover mt-0.5 cursor-pointer"
            />
          </Link>
        </div>
        
        {/* Text Details */}
        <div className="flex flex-col">
          {/* Title */}
<Link to={`/watch/${video._id}`}>
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
              {video.title}
            </h3>
          </Link>
          
          {/* Channel Name */}
          <Link to={`/channel/${Channel?._id}`}>
            <p className="text-[14px] text-gray-600 mt-1 hover:text-gray-900 transition-colors">
              {Channel?.channelName}
            </p>
          </Link>
          
          {/* Views & Timestamp */}
          <div className="text-[13px] text-gray-600 flex items-center">
            <p>{video.views}</p>
            <span className="mx-1 text-[10px]">•</span>
            <p>{timestamp}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default VideoCard;