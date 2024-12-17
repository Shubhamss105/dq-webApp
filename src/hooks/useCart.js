import { useState } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };


  const updateQuantity = (itemId, quantity) => {
    setCartItems(prev =>
      quantity === 0
        ? prev.filter(item => item.id !== itemId)
        : prev.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount
  };
};