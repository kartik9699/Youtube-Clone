import { useState, useEffect } from 'react';

import VideoCard from './VideoCard';
import CategoryCard from './CategoryCard';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
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
  const [Video, setVideo] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    async function fetchData() {
      // If there's a search query, append it to request so the backend filters by title
      const url = query.trim() ? `http://localhost:3000/videos?q=${encodeURIComponent(query.trim())}` : "http://localhost:3000/videos";
      const data = await axios(url);
      setVideo(data.data);
    }
    fetchData()
  }, [query])

  return (
    <div className="flex flex-col gap-5 w-full">

      {/* Inject the Component and pass the props */}
      <CategoryCard
        categories={categoriesData}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />

      {/* Show current search heading when searching */}
      {query.trim() && (
        <p className="px-4 text-sm text-gray-700">
          Search results for "{query.trim()}" ({Video.length} videos)
        </p>
      )}

      {/* Main Video Grid Below the Category Bar */}
      {Video.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          🎥 No videos found.
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 mt-10">
          {Video.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}

    </div>
  );
}
export default Home;
