import React from 'react'

function CategoryCard({ categories, activeCategory, onCategorySelect }) {
  return (
    // The sticky positioning keeps it fixed right below the header when you scroll down
    <div className="flex overflow-x-auto gap-3 py-3 px-4 bg-white sticky top-16 z-30 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onCategorySelect(category)}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeCategory === category
              ? 'bg-black text-white' // Active style
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200' // Inactive style
          }`}
        >
          {category}
        </button>
      ))}
      
    </div>
  );
}

export default CategoryCard
