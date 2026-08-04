import React, { useState } from 'react';

import VideoCard from './VideoCard';
import CategoryCard from './CategoryCard';
// The data array extracted from your image
const categoriesData = [
  "All", 
  "Web Development", 
  "JavaScript", 
  "Data Structures", 
  "Server", 
  "Music", 
  "Information technology", 
  "Podcasts", 
  "Gaming", 
  "Live", 
  "Spring Framework"
];

 function Home() {
  // State to track which category is clicked
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex flex-col gap-5 w-full">
      
      {/* Inject the Component and pass the props */}
      <CategoryCard 
        categories={categoriesData}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />

      {/* Main Video Grid Below the Category Bar */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 mt-10">
        
        {[1, 2, 3, 4, 5, 6, 7, 8,10,11,23,41,56,78,90].map((video) => (
          <VideoCard key={video} />
        ))}
      </div>
      
    </div>
  );
}
export default Home;