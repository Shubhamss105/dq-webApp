import React from 'react';
import { useCart } from '../context/CartContext';

export default function MenuItem({ item, onAddToCart }) {
  const { addToCart } = useCart();


  const handleAddToCart = () => {
    addToCart(item);
    if (onAddToCart) onAddToCart();
  };


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={item.itemImage}
        alt={item.itemName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.itemName}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
        <p className="text-sm text-gray-500 mb-2">
          {item?.ingredients?.map((ing) => ing.ingredientName).join(', ')}
        </p>
        <p className="text-lg font-bold text-purple-600 mb-2">₹ {item.price}</p>

        <button
          onClick={handleAddToCart}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
