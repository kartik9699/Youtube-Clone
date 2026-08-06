import { useState } from 'react'
import ReactPlayer from 'react-player'

function VideoPlayer({ videoUrl }) {
  const [error, setError] = useState(false);

  // If no URL is provided, show a placeholder
  if (!videoUrl) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg flex items-center justify-center">
        <p className="text-white text-sm">No video available</p>
      </div>
    );
  }

  // If the player failed to load the URL, show a fallback message
  if (error) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg flex items-center justify-center flex-col px-6 text-center">
        <p className="text-white text-lg font-semibold mb-2">Video could not be played</p>
        <p className="text-gray-400 text-sm">The video URL may not be supported or is restricted for embedding.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full aspect-video bg-black sm:rounded-xl overflow-hidden border-y sm:border border-gray-800">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls={true}
          // Autoplay muted is the most reliable way to start playback
          // (browsers block autoplay with sound)
          playing={true}
          muted={true}
          playsinline={true}
          // Add YouTube-specific embed config
          config={{
            youtube: {
              playerVars: {
                rel: 0,
                modestbranding: 1,
                controls: 1,
              },
            },
          }}
          onError={() => setError(true)}
          onReady={() => setError(false)}
        />
      </div>
    </div>
  )
}

export default VideoPlayer
