import React from 'react'
import Banner from './Banner';
import ChannelHeader from './ChannelHeader';
import ChannelTabs from './ChannelTabs';
import VideoCard from './VideoCard';
function Channel({Video}) {
  return (
    <>
            {/* <Home /> */}
            <Banner />
            <ChannelHeader />
            <ChannelTabs />
           <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 mt-3">
        
        {Video.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>

    </>
  )
}

export default Channel
