"use client"
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeedbackButtonsProps {
  messageId: string;
  onFeedback: (messageId: string, isPositive: boolean) => void;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ messageId, onFeedback }) => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const handleFeedback = (isPositive: boolean) => {
    const newFeedback = isPositive ? 'positive' : 'negative';
    if (feedback !== newFeedback) {
      setFeedback(newFeedback);
      onFeedback(messageId, isPositive);
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback(true)}
        className={`hover:text-green-600 ${
          feedback === 'positive' ? 'text-green-600' : 'text-gray-500'
        }`}
        aria-label="Thumbs up"
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback(false)}
        className={`hover:text-red-600 ${
          feedback === 'negative' ? 'text-red-600' : 'text-gray-500'
        }`}
        aria-label="Thumbs down"
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FeedbackButtons;