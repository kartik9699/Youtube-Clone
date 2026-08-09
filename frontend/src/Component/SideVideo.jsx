import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import HorizontalVideocard from './HorizontalVideocard';
import VideoCard from './VideoCard'; // Ensure you import your VideoCard component

function SideVideo() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]);
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
          <div className="p-4 justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-x-2 gap-y-2 mt-10 w-full">
            {videos.map((video) => (
              <React.Fragment key={video._id || video.id}>
                
                {/* Mobile, sm, and md screens: Show VideoCard, hide on lg and above */}
                <div className="block lg:hidden w-full">
                  <VideoCard video={video} />
                </div>

                {/* lg and xl screens: Show HorizontalVideocard, hide on smaller screens */}
                <div className="hidden lg:block w-full">
                  <HorizontalVideocard video={video} />
                </div>

              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SideVideo;