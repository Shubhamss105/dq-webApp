import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRestaurant } from "../context/RestaurantContext";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import { useMenu } from "../hooks/useMenu";
import { useCategories } from "../hooks/useCategories";
import { useCart } from "../context/CartContext";
import { Loader2 } from "lucide-react";
import { fetchMenuByCategory } from "../api/menuService";
import CartPopup from "../components/CartPopup";

export default function Home() {
  const [searchParams] = useSearchParams();
  const { setRestaurantId, setTableNo } = useRestaurant();
  const restaurantId = searchParams.get("restaurantId");
  const tableNo = searchParams.get("tableNo");

  // const restaurantId='R1733641669'
  // const tableNo='2'

  const { menuItems, loading: menuLoading, error: menuError } = useMenu(restaurantId);
  const { categories, loading: catLoading, error: catError } = useCategories(restaurantId);
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set restaurantId and tableNo in the context
    setRestaurantId(restaurantId);
    setTableNo(tableNo);
  }, [restaurantId, tableNo, setRestaurantId, setTableNo]);

  useEffect(() => {
    const loadItems = async () => {
      if (!selectedCategory) {
        setFilteredItems(menuItems);
        return;
      }

      try {
        setLoading(true);
        const categoryItems = await fetchMenuByCategory(selectedCategory);
        setFilteredItems(categoryItems);
      } catch (error) {
        console.error("Failed to fetch category items:", error);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [selectedCategory, menuItems]);

  const handleAddToCart = (item) => {
    if (!addToCart) {
      console.error("addToCart is not defined.");
      return;
    }
    addToCart(item);
  };


  const MenuItem = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={item.itemImage} alt={item.itemName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.itemName}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
        <h5 className="text-gray-500 font-medium mb-2">Ingredients:</h5>
       {/* Ingredients Section */}
      <div className="flex flex-wrap gap-2 mb-4">
        {item?.ingredients?.map((ingredient, index) => (
          <div
            key={index}
            className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm shadow-sm"
          >
            {ingredient.ingredientName}
          </div>
        ))}
      </div>
        <p className="text-lg font-bold text-purple-600 mb-2">₹ {item.price}</p>
        
         
  
        <button
          onClick={() => handleAddToCart(item)}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
  

  if (menuLoading || catLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (menuError || catError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {menuError || catError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredItems?.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <CartPopup />
    </div>
  );
}
