import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import CartItem from '../components/CartItem';
import UserDetailsModal from '../components/UserDetailsModal';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api/orderService';
import { getUrlParams } from '../utils/urlParams';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, totalAmount, clearCart } = useCart();
  const [showUserModal, setShowUserModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const { restaurantId, tableNo } = getUrlParams();
  const restaurantId='R1733641669'
  const tableNo='1';


  const handleUserDetailsSubmit = async (details) => {
    try {
      setLoading(true);
      setError(null);

      const orderPayload= {
        tableNumber: tableNo,
        restaurantId,
        orderDetails: cartItems?.map(item => ({
          item_id: item.id,
          name: item.itemName,
          price: parseFloat(item.price),
          quantity: item.quantity
        })),
        phoneNumber: details.phone,
        userName: details.name,
        email: details.email,
        address: details.address
      };

      await placeOrder(orderPayload);
      clearCart();
      setShowUserModal(false);
      navigate('/success');
    } catch (err) {
      setError(err ? err.message : 'Failed to place order');
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
          onClick={() => navigate('/')}
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
          />
        ))}
      </div>
      
      <div className="border-t mt-6 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold text-purple-600">
            {totalAmount}
          </span>
        </div>
        
        <button
          onClick={() => setShowUserModal(true)}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Pay and Order'}
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
