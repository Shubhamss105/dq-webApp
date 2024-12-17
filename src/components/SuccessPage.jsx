import React, { useState } from 'react';
import { ChefHat, Star, Home } from 'lucide-react';

export default function SuccessPage({ onGoHome, onSubmitFeedback }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitFeedback = () => {
    if (rating > 0) {
      onSubmitFeedback({ rating, comment });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <div className="animate-bounce mb-6">
        <ChefHat className="w-16 h-16 mx-auto text-blue-600" />
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
      <p className="text-gray-600 mb-8">
        Our chefs are preparing your delicious meal. You'll receive updates about your order status.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">How was your experience?</h3>
        
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`transition-colors ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              <Star className="w-8 h-8 fill-current" />
            </button>
          ))}
        </div>
        
        <textarea
          placeholder="Share your feedback (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          rows={3}
        />
        
        <button
          onClick={handleSubmitFeedback}
          disabled={rating === 0}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-400"
        >
          Submit Feedback
        </button>
      </div>
      
      <button
        onClick={onGoHome}
        className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
      >
        <Home className="w-5 h-5" />
        Return to Home
      </button>
    </div>
  );
}