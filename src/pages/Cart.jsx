import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import CartItem from '../components/CartItem';
import UserDetailsModal from '../components/UserDetailsModal';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api/orderService';
import { useRestaurant } from "../context/RestaurantContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, totalAmount, clearCart, removeFromCart } = useCart();
  const { restaurantId, tableNo,setUserId } = useRestaurant();

  const [showUserModal, setShowUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUserDetailsSubmit = async (details) => {
    try {
      setLoading(true);
      setError(null);
  
      const orderDetails = cartItems?.map(item => ({
        id: String(item.id), 
        itemName: item.itemName,
        category: item.category,
        price: Number(item.price),
        ingredients: item.ingredients.map(ingredient => ingredient.ingredientName),
        imageUrl: item.itemImage,
        quantity: item.quantity
      }));
  
      const orderPayload = {
        tableNumber: tableNo || null,
        restaurantId,
        orderDetails: JSON.stringify(orderDetails),
        phoneNumber: details.phone || null,
        userName: details.name,
        email: details.email || null,
        address: details.address || null
      };
  
      const response = await placeOrder(orderPayload);
      
      if (response?.success) {
        setUserId(response.data.order.user_id);
        clearCart();
        setShowUserModal(false);
        navigate('/success');
      } else {
        throw new Error(response.message || 'Failed to place order');
      }
    } catch (err) {
      setError(err?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };


  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate(`/menu?restaurantId=${restaurantId}&tableNo=${tableNo}`)}
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {cartItems?.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
            onRemoveItem={() => removeFromCart(item.id)}
          />
        ))}
      </div>
      
      <div className="border-t mt-6 pt-4">
        <div className="flex justify-between items-center mb-4 mx-2">
          <span className="text-xl font-semibold mx-2">Total:</span>
          <span className="text-2xl font-bold text-purple-600">
            {totalAmount}
          </span>
        </div>
        
        <button
          onClick={() => setShowUserModal(true)}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>

      {showUserModal && (
        <UserDetailsModal
          onSubmit={handleUserDetailsSubmit}
          onClose={() => setShowUserModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
}
