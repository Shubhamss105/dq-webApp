// import React from 'react';
// import { useCart } from '../context/CartContext'

// export default function Cart() {
//   const { cartItems, removeFromCart, updateQuantity } = useCart();

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (cartItems.length === 0) {
//     return (
//       <div className="text-center py-8">
//         <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
//         <p className="text-gray-500">Your cart is empty</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {cartItems?.map((item) => (
//         <CartItem
//           key={item.id}
//           item={item}
//           onUpdateQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
//         />
//       ))}

//       <div className="border-t pt-4">
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-lg font-semibold">Total:</span>
//           <span className="text-xl font-bold text-blue-600">
//             ₹ {total.toFixed(2)}
//           </span>
//         </div>

//         <button
//           onClick={() => {}}
//           className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
//         >
//           Pay and Order
//         </button>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  console.log('cartItemssss',cartItems)

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-4">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-4">
            <div>
              <h3>{item.itemName}</h3>
              <p>Price: ₹ {item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}

      <h2>Total: ₹ {total.toFixed(2)}</h2>
    </div>
  );
}

