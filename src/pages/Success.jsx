import React from 'react';
import SuccessPage from '../components/SuccessPage';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    // Here you would typically send the feedback to your backend
  };

  return (
    <SuccessPage
      onGoHome={() => navigate('/')}
      onSubmitFeedback={handleFeedbackSubmit}
    />
  );
}