import { endpoints } from './endpoints';

export const placeOrder = async (orderData) => {
  const response = await fetch(endpoints.placeOrder, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  
  if (!response.ok) throw new Error('Failed to place order');
  return response.json();
};