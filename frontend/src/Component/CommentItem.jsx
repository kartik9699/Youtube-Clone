// Helper to format createdAt into a relative "time ago" string
function timeAgo(dateString) {
  if (!dateString) return "";
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

function CommentItem({ comment }) {
  // Backend returns author as a populated object (username/email/avatar)
  const author = comment.author;
  const authorName =
    (author && (author.username || author.email)) || "Anonymous";
  const avatar = author?.avatar || "https://ui-avatars.com/api/?name=A&background=0D8ABC&color=fff";

  return (
    <div className="flex gap-4 text-sm">
      {/* Left Column: Avatar */}
      <div className="shrink-0 pt-1 relative">
        <img
          src={avatar}
          alt={authorName}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 min-w-0">
        {/* Header: Username and Time */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="font-medium text-[13px] hover:bg-gray-100 rounded px-1 -ml-1 cursor-pointer">
            {authorName}
          </span>
          <span className="text-gray-500 text-xs">
            {timeAgo(comment.createdAt)}
          </span>
        </div>

        {/* Comment Body */}
        <p className="text-[#0f0f0f] text-[14px] leading-[20px] whitespace-pre-wrap pr-4">
          {comment.text}
        </p>

        {/* Action Bar */}
        <div className="flex items-center gap-4 mt-2">
          {/* Like */}
          <div className="flex items-center gap-1 text-gray-600">
            <button className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </button>
            <span className="text-xs font-medium">{comment.likes || 0}</span>
          </div>

          {/* Dislike */}
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
            </svg>
          </button>

          {/* Reply Button */}
          <button className="text-[12px] font-semibold hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
            Reply
          </button>
        </div>
      </div>

      {/* Far Right: More Options */}
      <div className="shrink-0 pt-1">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-900">
             <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default CommentItem;
