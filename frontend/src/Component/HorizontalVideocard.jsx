import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
function HorizontalVideocard ({video}) {
const [Channel,setChannel]=useState();
    useEffect(() => {
        async function fetchChannel() {
            try {
                const response = await axios(`http://localhost:3000/channels/${video.channelId}`);
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
    <div className="flex flex-col sm:w-[300px] lg:flex-row gap-3 p-3 bg-[#F6EFE9] w-full lg:w-[400px] max-w-[500px] font-sans rounded-xl">
      {/* Thumbnail Section */}
      <div className="relative shrink-0 w-[170px] h-[100px] sm:w-[190px] sm:h-[110px]">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover rounded-xl"
        />
       
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-1 relative py-0.5">
        <h3 className="text-[15px] font-semibold text-gray-900 leading-tight line-clamp-3 pr-2">
          {video.title}
        </h3>
        
        <p className="text-[13px] text-gray-600 mt-1">
          {Channel?.channelName}
        </p>
        
        <div className="text-[13px] text-gray-600 flex items-center gap-1.5 mt-0.5">
          {/* Outlined Play Icon */}
          
          <span>{video.views}</span>
          <span className="ml-1">{}</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalVideocard;