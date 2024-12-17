import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/menuService';

export const useCategories = (restaurantId) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories(restaurantId);
        setCategories(data);
      } catch (err) {
        setError(err? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, [restaurantId]);

  return { categories, loading, error };
};