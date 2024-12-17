import React from 'react';
import { Plus, Minus } from 'lucide-react';


export default function CartItem({ item, onUpdateQuantity }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
      <img
        src={item.itemImage}
        alt={item.itemName}
        className="w-24 h-24 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold">{item.itemName}</h3>
        <p className="text-sm text-gray-600">{item.category}</p>
        <p className="text-purple-600 font-bold">₹ {item.price}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(Math.max(0, item.quantity - 1))}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}