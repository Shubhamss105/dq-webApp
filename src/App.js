import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useSearchParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./context/CartContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { fetchRestaurantProfile } from "./api/menuService";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const getRestaurantProfile = async () => {
      try {
        if (!restaurantId) return;
        const data = await fetchRestaurantProfile(restaurantId);
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurant profile:", error);
      }
    };

    getRestaurantProfile();
  }, [restaurantId]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {restaurant?.image ? (
          <img
            src={restaurant.image}
            alt="Restaurant Logo"
            className="h-10 w-10 object-cover rounded-full"
          />
        ) : (
          <h1 className="text-xl font-bold text-gray-800">DQ</h1>
        )}
        <CartIcon />
      </div>
    </nav>
  );
};

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
