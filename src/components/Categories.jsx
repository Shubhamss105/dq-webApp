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
          className={`px-4 py-2 rounded-full ${
            selectedCategory === null
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          All
        </button>
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id.toString())}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.id.toString()
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
    </div>
  );
}