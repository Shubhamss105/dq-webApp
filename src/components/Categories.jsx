import React from 'react';

export default function Categories({
  categories,
  selectedCategory,
  onSelectCategory
}) {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4 px-4 min-w-max">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-8 py-2 rounded-lg flex flex-col items-center justify-center space-y-2 ${
            selectedCategory === null
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          <span>All</span>
        </button>
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id.toString())}
            className={`px-4 py-2 rounded-lg flex flex-col items-center space-y-2 ${
              selectedCategory === category.id.toString()
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <img
              src={category.categoryImage} 
              alt={category.categoryName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span>{category.categoryName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
