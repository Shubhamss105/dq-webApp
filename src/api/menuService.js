import { endpoints } from './endpoints';

export const fetchMenu = async (restaurantId) => {
  const response = await fetch(endpoints.menu(restaurantId));
  if (!response.ok) throw new Error('Failed to fetch menu');
  return response.json();
};

export const fetchCategories = async (restaurantId)=> {
  const response = await fetch(endpoints.categories(restaurantId));
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};
export const fetchRestaurantProfile = async (restaurantId)=> {
  const response = await fetch(endpoints.restaurantProfile(restaurantId));
  if (!response.ok) throw new Error('Failed to fetch restaurant profile');
  return response.json();
};

export const fetchMenuByCategory = async (categoryId) => {
  const response = await fetch(endpoints.menuByCategory(categoryId));
  if (!response.ok) throw new Error('Failed to fetch category menu');
  return response.json();
};