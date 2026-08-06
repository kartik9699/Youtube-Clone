import React from 'react'
import ReactPlayer from 'react-player'
function VideoPlayer({videoUrl}) {
  return (
    <div>
      <div className="relative w-full aspect-video bg-black sm:rounded-xl overflow-hidden border-y sm:border border-gray-800">
      <ReactPlayer 
        url={videoUrl}
        width="100%"
        height="100%"
        controls={true}
        playing={true}
      />
    </div>
    </div>
  )
}

export default VideoPlayer
