import React from 'react';
import SuccessPage from '../components/SuccessPage';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from "../context/RestaurantContext";

export default function Success() {

  const navigate = useNavigate();
    const { restaurantId, tableNo } = useRestaurant();

  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    // Here you would typically send the feedback to your backend
  };

  return (
    <SuccessPage
      onGoHome={() => navigate(`/menu?restaurantId=${restaurantId}&tableNo=${tableNo}`)}
      onSubmitFeedback={handleFeedbackSubmit}
    />
  );
}