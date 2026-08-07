import React from 'react';

 function CommentInput() {
  return (
    <div className="flex gap-4 items-start w-full">
      {/* Current User Avatar */}
      <div className="w-10 h-10 rounded-full bg-black shrink-0"></div>
      
      <div className="flex-1">
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="w-full bg-transparent border-b border-gray-300 pb-1 text-sm focus:outline-none focus:border-black transition-colors"
        />
      </div>
    </div>
  );
}
export default CommentInput;