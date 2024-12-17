import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
// import { X } from 'lucide-react';

export default function CartPopup() {
  const navigate = useNavigate();
  const {  totalItems, showCartPopup, toggleCartPopup} = useCart();

  if (!showCartPopup) return null; 

  const handleGoToCart = () => {
    toggleCartPopup(false);
    navigate('/cart'); 
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 w-4/5 bg-white rounded-lg shadow-lg p-4 animate-slide-up">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{totalItems} items added to Cart</span>
        {/* <button onClick={toggleCartPopup} className="text-red-600">
        <X />
        </button> */}
      </div>
      <button
        onClick={handleGoToCart}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
      >
        View Cart
      </button>
    </div>
  );
}
