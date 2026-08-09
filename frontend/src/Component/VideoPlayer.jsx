import { useState } from 'react'
import { resolveMediaUrl } from '../Utils/videoUrl'

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

  // Resolve local uploaded file paths (/uploads/...) to a full backend URL
  // so the native HTML5 <video> player can load them.
  const resolvedUrl = resolveMediaUrl(videoUrl);

  if (!resolvedUrl) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg flex items-center justify-center">
        <p className="text-white text-sm">No video available</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg flex items-center justify-center flex-col px-6 text-center">
        <p className="text-white text-lg font-semibold mb-2">Video could not be played</p>
        <p className="text-gray-400 text-sm">The video file may not be supported or could not be loaded.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full aspect-video h-80 md:h-120 bg-black sm:rounded-xl overflow-hidden border-y sm:border border-gray-800">
        <video
          key={resolvedUrl}
          className="w-full h-full object-contain"
          src={resolvedUrl}
          controls
          playsInline
          preload="metadata"
          onError={() => setError(true)}
          onCanPlay={() => setError(false)}
        >
          Your browser does not support HTML5 video.
        </video>
      </div>
    </div>
  )
}

export default VideoPlayer

