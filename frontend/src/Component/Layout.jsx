import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import VideoCard from './VideoCard';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Pass toggleSidebar handler to Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* 2. Main Body Container */}
      <div className="flex pt-16">
        {/* Pass state and toggle handler to Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* 3. Main Content Area */}
        {/* Dynamic margin-left (ml-60 when open, ml-18 when closed on desktop) */}
        <main
          className={`flex-1 transition-all duration-300 p-6 bg-gray-50 min-h-[calc(100vh-4rem)] overflow-y-auto ${
            isSidebarOpen ? 'md:ml-60' : 'md:ml-18'
          }`}
        ><div className='flex gap-1.5 flex-wrap'>
          <VideoCard />
          <VideoCard />
          <VideoCard /></div>

        </main>
      </div>
    </div>
  );
}