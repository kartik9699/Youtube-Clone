import { MdCheckCircle } from 'react-icons/md'
function ChannelHeader({ channel, isOwner }) {
  const name = channel?.channelName || 'My Channel';
  const description = channel?.description || 'This channel has no description yet.';
  const handle = name.toLowerCase().replace(/\s+/g, '');
  const videoCount = channel?.videos?.length || 0;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 pt-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
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
    </div>
  )
}

export default ChannelHeader
