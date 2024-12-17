import { useState, useEffect } from 'react';

export const useMenu = (restaurantId) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`https://rest.dicui.org/api/webMenu?restaurantId=${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err ? err.message : 'Failed to fetch menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  return { menuItems, loading, error };
};