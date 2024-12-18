import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 flex-wrap sm:flex-nowrap">
      {/* Item Image */}
      <img
        src={item.itemImage}
        alt={item.itemName}
        className="w-24 h-24 object-cover rounded-md"
      />

      {/* Item Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.itemName}</h3>
        <p className="text-sm text-gray-600">{item.category}</p>
        <p className="text-purple-600 font-bold">₹ {item.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
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

      {/* Delete Button */}
      <button
        onClick={onRemoveItem}
        className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
