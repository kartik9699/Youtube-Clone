import React from 'react';

function Banner() {
  return (
   <div className="w-full max-w-[1280px] mx-auto flex justify-center pt-2 md:pt-4 px-0 md:px-4">
      <img 
        src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ_Zuz3haRHrSz0f3bnMlUTGa14Qc7Z5LLQ3-l04P98hv9CMXQU" 
        alt="Channel Banner" 
        className="w-full h-[100px] sm:h-[150px] md:h-[200px] lg:h-[212px] object-cover md:rounded-2xl"
      />
    </div>
  );
}

export default Banner;