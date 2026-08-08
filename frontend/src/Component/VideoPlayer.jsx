import { useState } from 'react'
import ReactPlayer from 'react-player'
import { getYouTubeVideoId, normalizeVideoUrl } from '../Utils/videoUrl'

function VideoPlayer({ videoUrl, title, channelName }) {
  const [error, setError] = useState(false);

  // If no URL is provided, show a placeholder
  if (!videoUrl) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-lg flex items-center justify-center">
        <p className="text-white text-sm">No video available</p>
      </div>
    );
  }

  // Try to extract a YouTube video ID first. If it's a YouTube video we
  // render YouTube's native iframe embed directly, which is the most
  // reliable way to play YouTube videos (react-player's YouTube integration
  // can fail and leave a black screen).
  const youtubeId = getYouTubeVideoId(videoUrl);

  if (youtubeId) {
    // rel=0 disables "more videos"/related suggestions at the end.
    // modestbranding=1 hides the YouTube logo in the control bar.
    // showinfo=0 tells older API versions to hide the video title and channel (mostly deprecated but good to include).
    // iv_load_policy=3 hides video annotations.
    // youtube-nocookie.com avoids extra YouTube cookies/branding.
    // controls=1 keeps the player's own controls visible.
    const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&controls=1&showinfo=0&color=white`;
    
    return (
      <div>
        <div className="relative w-full aspect-video h-80 md:h-120 bg-black sm:rounded-xl overflow-hidden border-y sm:border border-gray-800">
          <iframe
            key={embedUrl}
            className="w-full h-full"
            src={embedUrl}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // --- Non-YouTube sources: use react-player ---
  const normalizedUrl = normalizeVideoUrl(videoUrl);

  if (!normalizedUrl) {
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
        <p className="text-gray-400 text-sm">The video URL may not be supported or is restricted for embedding.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full aspect-video h-80 md:h-120 bg-black sm:rounded-xl overflow-hidden border-y sm:border border-gray-800">
        <ReactPlayer
          key={normalizedUrl}
          url={normalizedUrl}
          width="100%"
          height="100%"
          controls={true}
          playing={false}
          playsinline={true}
          onError={() => setError(true)}
          onReady={() => setError(false)}
          config={{
            youtube: {
              playerVars: { 
                modestbranding: 1, // Hides YT logo
                showinfo: 0,       // Hides title/channel (where supported)
                rel: 0,            // Hides related videos from other channels
                controls: 1        // Shows standard controls
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default VideoPlayer