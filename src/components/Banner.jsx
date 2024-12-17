import React from 'react';

export default function Banner() {
  return (
    <div className="relative h-[200px] md:h-[300px] w-full">
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
        alt="Restaurant Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to Our Restaurant</h1>
          <p className="text-lg md:text-xl">Scan & Order Your Favorite Dishes</p>
        </div>
      </div>
    </div>
  );
}