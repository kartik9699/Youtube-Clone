import React from 'react'
import { MdCheckCircle } from 'react-icons/md'
function ChannelHeader() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 pt-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
      {/* Avatar */}
      <img 
        src="https://yt3.googleusercontent.com/ytc/AIdro_k69a6jF6J9j2gH9v6v9g6j9g6j9g6j9g6j9g=s176-c-k-c0x00ffffff-no-rj" 
        alt="Coke Studio India" 
        className="w-20 h-20 md:w-[160px] md:h-[160px] rounded-full object-cover"
      />
      
      {/* Channel Details */}
      <div className="flex-1 flex flex-col items-start text-[#0f0f0f]">
        <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-2 mb-1 md:mb-2">
          Coke Studio India
          <MdCheckCircle className="text-[#606060] text-lg md:text-xl" />
        </h1>
        
        <div className="flex flex-wrap items-center text-[#606060] text-sm gap-2 mb-2">
          <span className="font-medium text-[#0f0f0f]">@cokestudioindia</span>
          <span>•</span>
          <span>7.23M subscribers</span>
          <span>•</span>
          <span>979 videos</span>
        </div>
        
        <div className="text-[#606060] text-sm mb-3 flex items-center gap-1 cursor-pointer">
          <p className="line-clamp-1">Music has always been a way to uplift oneself, express emotions, and feel connected to c...</p>
          <span className="font-medium text-[#0f0f0f] whitespace-nowrap">more</span>
        </div>

        <div className="text-sm font-medium text-blue-600 mb-4 cursor-pointer hover:underline">
          Instagram and 2 more links
        </div>
        
        <button className="bg-[#0f0f0f] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#272727] transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default ChannelHeader
