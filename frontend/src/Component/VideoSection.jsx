import React from 'react';
import VideoPlayer from './VideoPlayer';
import { RiDownloadLine } from "react-icons/ri";
import { PiShareFat } from "react-icons/pi";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
export default function VideoSection() {
  const currentVideoData = {
    title: "Weather Forecast Website Using HTML, Tailwind CSS, Javascript.",
    videoUrl: "https://www.youtube.com/watch?v=CS7DgYxER34",
    channelName: "404 page not found!",
    subscribers: "3 subscribers",
    likes: "0"
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-[70%]">
      {/* Video Player */}
      <VideoPlayer videoUrl={currentVideoData.videoUrl} />

      {/* Video Title - Adds side padding on mobile so it doesn't touch screen edges */}
      <h1 className="text-lg sm:text-xl font-bold line-clamp-2 px-4 sm:px-0">
        {currentVideoData.title}
      </h1>

      {/* Channel Info & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-0">
        
        {/* Channel Info & Subscribe button */}
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex-shrink-0"></div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{currentVideoData.channelName}</h3>
              <p className="text-xs text-gray-400">{currentVideoData.subscribers}</p>
            </div>
          </div>
          <button className="ml-2 sm:ml-4 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-400 flex-shrink-0">
            Subscribe
          </button>
        </div>

        {/* Action Buttons (Like, Dislike, Share) */}
        {/* Allows wrapping horizontally on small screens */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
          <div className="flex bg-[#E6E6E6] rounded-full overflow-hidden flex-shrink-0">
            <button className="px-4 py-2 hover:bg-gray-200 flex items-center gap-2 text-sm border-r border-gray-600 font-medium">
              <SlLike /> {currentVideoData.likes}
            </button>
            <button className="px-4 py-2 hover:bg-gray-200 text-sm"><SlDislike /> </button>
          </div>
          <button className="px-4 py-2 bg-[#E6E6E6] hover:bg-gray-200 rounded-full text-sm flex items-center gap-2 font-medium flex-shrink-0">
            <PiShareFat /> Share
          </button>
          <button className="px-4 py-2 bg-[#E6E6E6] hover:bg-gray-200 rounded-full text-sm flex items-center gap-2 font-medium flex-shrink-0 hidden sm:flex">
             <RiDownloadLine />Download
          </button>
        </div>
      </div>
      
      {/* Description Box (Optional, mimicking real YouTube) */}
      <div className="mx-4 sm:mx-0 bg-[#E6E6E6] p-3 rounded-xl mt-2 text-sm">
        <p className="font-semibold">1.2K views • 2 days ago</p>
        
      </div>
    </div>
  );
}