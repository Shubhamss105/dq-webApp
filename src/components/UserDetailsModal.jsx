import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

export default function UserDetailsModal({ onSubmit, onClose, loading }) {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    orderType: 'in_restaurant', // default to in restaurant
    deliver_id: 0 // default to 0 (in restaurant)
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!details.name.trim()) newErrors.name = 'Name is required';
    if (!details.phone.trim()) newErrors.phone = 'Phone is required';
    if (details.orderType === 'delivery' && !details.address.trim()) {
      newErrors.address = 'Address is required for delivery';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(details);
  };

  const handleOrderTypeChange = (e) => {
    const orderType = e.target.value;
    setDetails({
      ...details,
      orderType,
      deliver_id: orderType === 'delivery' ? 1 : 0
    });
    // Clear address error when switching order types
    if (errors.address) {
      setErrors({...errors, address: null});
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              disabled={loading}
              className={`w-full p-2 border rounded-md ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } disabled:bg-gray-100`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={details.email}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              disabled={loading}
              className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={details.phone}
              onChange={(e) => setDetails({ ...details, phone: e.target.value })}
              disabled={loading}
              className={`w-full p-2 border rounded-md ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } disabled:bg-gray-100`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Type *
            </label>
            <select
              value={details.orderType}
              onChange={handleOrderTypeChange}
              disabled={loading}
              className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
            >
              <option value="in_restaurant">In Restaurant</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address {details.orderType === 'delivery' && '*'}
            </label>
            <textarea
              value={details.address}
              onChange={(e) => setDetails({ ...details, address: e.target.value })}
              disabled={loading}
              className={`w-full p-2 border rounded-md ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              } disabled:bg-gray-100`}
              rows={3}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? 'Processing...' : 'Submit Order'}
          </button>
        </form>
      </div>
    </div>
  );
}