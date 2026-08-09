import { useState } from 'react'
import { MdCheckCircle } from 'react-icons/md'
import { FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi'
function ChannelHeader({ channel, isOwner, onEditChannel, onDeleteChannel }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const name = channel?.channelName || 'My Channel';
  const description = channel?.description || 'This channel has no description yet.';
  const handle = name.toLowerCase().replace(/\s+/g, '');
  const videoCount = channel?.videos?.length || 0;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 pt-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center relative">
      {/* Avatar */}
      <img 
        src={channel?.avatar || 'https://ui-avatars.com/api/?name=Y&background=0D8ABC&color=fff'} 
        alt={name} 
        className="w-20 h-20 md:w-[160px] md:h-[160px] rounded-full object-cover"
      />
      
      {/* Channel Details */}
      <div className="flex-1 flex flex-col items-start text-[#0f0f0f]">
        <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-2 mb-1 md:mb-2">
          {name}
          <MdCheckCircle className="text-[#606060] text-lg md:text-xl" />
        </h1>
        
        <div className="flex flex-wrap items-center text-[#606060] text-sm gap-2 mb-2">
          <span className="font-medium text-[#0f0f0f]">@{handle}</span>
          <span>•</span>
          <span>{videoCount} videos</span>
        </div>
        
        <div className="text-[#606060] text-sm mb-3 flex items-center gap-1 cursor-pointer">
          <p className="line-clamp-2">{description}</p>
        </div>

        {isOwner ? (
          <span className="text-sm font-medium text-[#606060]">
            This is your channel
          </span>
        ) : (
          <button className="bg-[#0f0f0f] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#272727] transition-colors">
            Subscribe
          </button>
        )}
      </div>

      {/* Owner-only three-dots menu */}
      {isOwner && (
        <div className="self-start md:self-center">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            title="Channel options"
            className="p-2 text-[#606060] hover:bg-[#e5e5e5] rounded-full transition-colors"
          >
            <FiMoreVertical size={22} />
          </button>

          {menuOpen && (
            <>
              {/* Click anywhere outside to close */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-4 md:right-12 top-16 md:top-auto md:bottom-0 z-50 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5">
                <button
                  onClick={() => { setMenuOpen(false); onEditChannel && onEditChannel(); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <FiEdit size={16} className="text-gray-600" />
                  Edit channel
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onDeleteChannel && onDeleteChannel(); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiTrash2 size={16} />
                  Delete channel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ChannelHeader
