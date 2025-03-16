export const API_BASE_URL = 'https://rest.dicui.org/api';

export const endpoints = {
  menu: (restaurantId) => `${API_BASE_URL}/webMenu?restaurantId=${restaurantId}`,
  categories: (restaurantId) => `${API_BASE_URL}/webMenu/categories?restaurantId=${restaurantId}`,
  menuByCategory: (categoryId) => `${API_BASE_URL}/menu/category/${categoryId}`,
  placeOrder: `${API_BASE_URL}/addOrder`,
  restaurantProfile: (restaurantId)=>`${API_BASE_URL}/rest-profile/${restaurantId}`,
};