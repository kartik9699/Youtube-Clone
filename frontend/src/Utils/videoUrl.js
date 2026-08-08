/**
 * Extract a YouTube video ID from any common YouTube URL format.
 * Supports watch?v=, youtu.be, shorts, embed, live, v/, mobile,
 * youtube-nocookie, and bare 11-char video IDs.
 *
 * @param {string} url - The raw video URL or ID.
 * @returns {string|null} The 11-char YouTube video ID, or null if not a YouTube URL.
 */
export function getYouTubeVideoId(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // watch / shorts / embed / live / v / attribution_link forms
  let match = trimmed.match(
    /(?:youtube\.com|youtube-nocookie\.com)\/(?:watch\?.*v=|shorts\/|embed\/|live\/|v\/)([A-Za-z0-9_-]{11})/
  );
  // youtu.be short links
  if (!match) {
    match = trimmed.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  }

  if (match && match[1]) return match[1];

  // Bare 11-char video ID
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;

  return null;
}

/**
 * Normalize various video-sharing platform URLs into a canonical format
 * that react-player can reliably load. Primarily handles YouTube URL
 * variants (watch, youtu.be, shorts, embed, live, mobile) and signature
 * query params, but also passes through Vimeo and other supported URLs.
 *
 * @param {string} url - The raw video URL pasted by the user.
 * @returns {string|null} A normalized, playable URL or null if unparseable.
 */
export function normalizeVideoUrl(url) {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  // Local / relative file paths or direct media files - pass through as-is
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("data:") ||
    /\.(mp4|webm|ogg|mov|m4v|mkv)(\?.*)?$/i.test(trimmed)
  ) {
    return trimmed;
  }

  // --- YouTube handling ---
  // 1. Standard / watch?v=, /shorts/, /embed/, /live/, /v/ forms
  const youtubeMatch =
    trimmed.match(
      /(?:youtube\.com|youtube-nocookie\.com)\/(?:watch\?.*v=|shorts\/|embed\/|live\/|v\/|attribution_link\?.*u=\/watch\?.*v=)([A-Za-z0-9_-]{11})/
    ) ||
    // 2. youtu.be short links
    trimmed.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);

  // Player variables: 
  // modestbranding=1 (hides YT logo)
  // controls=1 (shows player controls)
  // showinfo=0 (deprecated by YT, but included for legacy support/wrappers)
  // rel=0 (only shows related videos from the same channel at the end)
  const ytParams = "&modestbranding=1&controls=1&showinfo=0&rel=0";

  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1];
    // Preserve the "start" / "t" timestamp param if present so the video
    // can start at the correct time.
    const tMatch = trimmed.match(/[?&](?:start|t)=(\d+)/);
    const start = tMatch ? `&start=${tMatch[1]}` : "";
    
    return `https://www.youtube.com/watch?v=${videoId}${ytParams}${start}`;
  }

  // 3. Bare YouTube video ID (11-char alphanumeric / dash / underscore)
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/watch?v=${trimmed}${ytParams}`;
  }

  // --- Vimeo --- (react-player supports vimeo.com/{id} and player.vimeo.com/video/{id})
  const vimeoMatch = trimmed.match(
    /(?:vimeo\.com|player\.vimeo\.com\/video)\/(\d+)/
  );
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://vimeo.com/${vimeoMatch[1]}`;
  }

  // --- DailyMotion ---
  const dailymotionMatch = trimmed.match(
    /(?:dailymotion\.com\/video\/|dai\.ly\/)([a-zA-Z0-9]+)/
  );
  if (dailymotionMatch && dailymotionMatch[1]) {
    return `https://www.dailymotion.com/video/${dailymotionMatch[1]}`;
  }

  // --- Fallback --- try to parse as a generic URL and pass through
  try {
    const parsed = new URL(trimmed);
    // Only accept http/https to avoid protocol trickery
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    // Not a valid URL
  }

  return null;
}