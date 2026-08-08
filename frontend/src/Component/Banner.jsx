import React from 'react';

// Wrap ImgUrl in curly braces to destructure it from the props object
function Banner({ ImgUrl }) {
  return (
   <div className="w-full max-w-[1280px] mx-auto flex justify-center pt-2 md:pt-4 px-0 md:px-4">
      <img 
        src={ImgUrl || 'https://ui-avatars.com/api/?name=Y&background=0D8ABC&color=fff'} 
        alt="Channel Banner" 
        className="w-full h-[100px] sm:h-[150px] md:h-[200px] lg:h-[212px] object-cover md:rounded-2xl"
      />
    </div>
  );
}

export default Banner;