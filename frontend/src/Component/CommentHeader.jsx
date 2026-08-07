import React from 'react';

 function CommentHeader({ commentCount }) {
  return (
    <div className="flex items-center gap-8 mb-6">
      <h2 className="text-xl font-bold">{commentCount} Comments</h2>
      
      <button className="flex items-center gap-2 font-medium text-sm hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h12M3 18h6" />
        </svg>
        Sort by
      </button>
    </div>
  );
}
export default CommentHeader;