import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./context/CartContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import CartPopup from "./components/CartPopup";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">DQ</h1>
          <CartIcon />
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Routes>

      {/* <CartPopup /> */}
    </BrowserRouter>
  );
}

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="relative p-2">
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default App;
