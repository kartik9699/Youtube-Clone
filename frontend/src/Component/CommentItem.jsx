import React from 'react';

function CommentItem({ comment }) {
  return (
    <div className="flex gap-4 text-sm">
      {/* Left Column: Avatar */}
      <div className="shrink-0 pt-1 relative">
        <img 
          src={comment.avatar} 
          alt={comment.author} 
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 min-w-0">
        
        {/* Pinned Indicator */}
        {comment.isPinned && (
          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium mb-1">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M16 11.78L20.25 16H13v6l-1 2-1-2v-6H3.75L8 11.78V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5v7.28z" />
            </svg>
            Pinned by {comment.pinnedBy}
          </div>
        )}

        {/* Header: Username and Time */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="font-medium text-[13px] hover:bg-gray-100 rounded px-1 -ml-1 cursor-pointer">
            {comment.author}
          </span>
          <span className="text-gray-500 text-xs">
            {comment.timeAgo}
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
            <span className="text-xs font-medium">{comment.likes}</span>
          </div>

          {/* Dislike */}
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
            </svg>
          </button>

          {/* Creator Heart Status */}
          {comment.hasCreatorHeart && (
            <div className="relative inline-block w-6 h-6">
              <img src="https://api.dicebear.com/7.x/initials/svg?seed=Pona" alt="creator" className="w-5 h-5 rounded-full object-cover" />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[1px]">
                <svg viewBox="0 0 24 24" fill="#ff0000" className="w-3.5 h-3.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          )}

          {/* Reply Button */}
          <button className="text-[12px] font-semibold hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors">
            Reply
          </button>
        </div>

        {/* Replies Toggle */}
        {comment.repliesCount > 0 && (
          <div className="mt-1">
            <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-full font-medium transition-colors">
               <div className="flex -space-x-2">
                 {/* Fake small avatars for replies visualization */}
                 <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                 <div className="w-5 h-5 rounded-full bg-gray-400 border border-white"></div>
               </div>
               {comment.repliesCount} replies
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 ml-1">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
               </svg>
            </button>
          </div>
        )}
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