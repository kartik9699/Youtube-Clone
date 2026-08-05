import React from 'react'
import { CiSearch } from "react-icons/ci";
function ChannelTabs() {
    const tabs = ["Home", "Videos", "Shorts", "Live", "Playlists", "Posts"];
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 mt-6 border-b border-gray-200">
      <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab, index) => (
          <button 
            key={index} 
            className={`pb-3 text-sm font-medium whitespace-nowrap ${
              index === 0 
                ? "text-[#0f0f0f] border-b-2 border-[#0f0f0f]" 
                : "text-[#606060] hover:text-[#0f0f0f]"
            }`}
          >
            {tab}
          </button>
        ))}
        <button className="pb-3 text-[#606060] hover:text-[#0f0f0f]">
          <CiSearch size={20} />
        </button>
      </div>
    </div>
  )
}

export default ChannelTabs
