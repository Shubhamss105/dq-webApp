import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import { fetchMenuItems } from "../api/menuService"; 

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract restaurantId and tableNo from URL
  const restaurantId = searchParams.get("restaurantId");
  const tableNo = searchParams.get("tableNo");

  useEffect(() => {
    if (restaurantId && tableNo) {
      fetchMenu();
    } else {
      setError("Invalid parameters. Please provide a restaurantId and tableNo.");
    }
  }, [restaurantId, tableNo]);

  // Function to fetch menu data
  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMenuItems(restaurantId); // API call to fetch menu items based on restaurantId
      setMenuItems(data);
    } catch (err) {
      setError("Failed to fetch menu items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-6">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        Menu for Table {tableNo}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
