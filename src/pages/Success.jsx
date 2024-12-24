import React from 'react';
import SuccessPage from '../components/SuccessPage';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from "../context/RestaurantContext";

export default function Success() {
  const navigate = useNavigate();
  const { restaurantId, tableNo,userId } = useRestaurant(); 

  const handleFeedbackSubmit = async (feedback) => {
    try {
      console.log('Feedback submitted:', feedback);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <SuccessPage
      onGoHome={() => navigate(`/menu?restaurantId=${restaurantId}&tableNo=${tableNo}`)}
      onSubmitFeedback={handleFeedbackSubmit}
      customerId={userId} 
    />
  );
}
