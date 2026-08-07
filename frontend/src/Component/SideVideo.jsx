import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import HorizontalVideocard from './HorizontalVideocard';

function SideVideo() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]); // Changed to lowercase 'videos' for convention
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoriesData = [
    "All", "Web Development", "JavaScript", "Data Structures", 
    "Server", "Music", "Information technology", "Podcasts", 
    "Gaming", "Live", "Spring Framework"
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/videos");
        setVideos(response.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      
      <div className="flex gap-5 w-full">
      
        
        <CategoryCard 
          categories={categoriesData}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />

        {/* Conditional rendering for loading/error states */}
        {loading && <p className="p-4 text-gray-500">Loading videos...</p>}
        {error && <p className="p-4 text-red-500">{error}</p>}

        {/* Main Video Grid Below the Category Bar */}
        {!loading && !error && (
          <div className="p-4 justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-x-2 gap-y-2 mt-10">
            {videos.map((video) => (
              <HorizontalVideocard 
                key={video._id || video.id} 
                video={video} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SideVideo;