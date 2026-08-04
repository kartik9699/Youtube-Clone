import React from 'react';

function VideoCard({ 
  thumbnail = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=281&fit=crop", 
  channelAvatar = "https://ui-avatars.com/api/?name=JS&background=0D8ABC&color=fff", 
  title = "Building a YouTube Clone with React and Tailwind CSS - Full Course", 
  channelName = "Code with AI", 
  views = "120K views", 
  timestamp = "2 months ago",
  duration = "14:20"
}) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer group w-100">
      
      {/* 1. Thumbnail Section */}
      <div className="relative w-full">
        <img 
          src={thumbnail} 
          alt="Video Thumbnail" 
          // aspect-video ensures a perfect 16:9 ratio. 
          // group-hover slightly reduces the rounded corners on hover, just like YouTube!
          className="w-full aspect-video rounded-xl object-cover group-hover:rounded-none transition-all duration-300"
        />
        {/* Duration Badge */}
        <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
          {duration}
        </span>
      </div>

      {/* 2. Video Details Section */}
      <div className="flex gap-3 mt-1 pr-4">
        
        {/* Channel Avatar */}
        <div className="shrink-0">
          <img 
            src={channelAvatar} 
            alt="Channel" 
            className="w-9 h-9 rounded-full object-cover mt-0.5 cursor-pointer"
          />
        </div>
        
        {/* Text Details */}
        <div className="flex flex-col">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
            {title}
          </h3>
          
          {/* Channel Name */}
          <p className="text-[14px] text-gray-600 mt-1 hover:text-gray-900 transition-colors">
            {channelName}
          </p>
          
          {/* Views & Timestamp */}
          <div className="text-[13px] text-gray-600 flex items-center">
            <p>{views}</p>
            <span className="mx-1 text-[10px]">•</span>
            <p>{timestamp}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default VideoCard;