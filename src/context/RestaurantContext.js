import React, { createContext, useContext, useState } from "react";

// Create the context
const RestaurantContext = createContext();

// Custom hook for consuming the context
export const useRestaurant = () => useContext(RestaurantContext);

// Context provider component
export const RestaurantProvider = ({ children }) => {
  const [restaurantId, setRestaurantId] = useState(null);
  const [tableNo, setTableNo] = useState(null);

  return (
    <RestaurantContext.Provider value={{ restaurantId, tableNo, setRestaurantId, setTableNo }}>
      {children}
    </RestaurantContext.Provider>
  );
};
