"use client";
import React, { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { API_URL } from "@/constants";
import getCookie from "@/actions/auth";

interface Source {
  filepath: string | null;
  score: number;
}

interface FeedbackButtonsProps {
  messageId: string;
  query: string;
  response: string;
  sources?: Source[];
  onFeedback: (messageId: string, isPositive: boolean) => void;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  messageId,
  query,
  response,
  sources,
  onFeedback,
}) => {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFeedback = async (isPositive: boolean) => {
    const newFeedback = isPositive ? "positive" : "negative";

    if (feedback === newFeedback) return;

    setIsLoading(true);
    setError(null);

    const feedbackData = {
      id: messageId,
      query,
      response,
      feedback: newFeedback,
      sources,
      timestamp: Date.now(),
    };
    const jwtToken = await getCookie();
    console.log(jwtToken);

    try {
      await axios.post(`${API_URL}/database/feedback`, feedbackData, {
        headers: {
          Authorization: `Bearer ${jwtToken?.value}`,
          "Content-Type": "application/json",
        },
      });
      setFeedback(newFeedback);
      onFeedback(messageId, isPositive);
    } catch (err) {
      console.error("Error sending feedback:", err);
      setError("Failed to save feedback. Please try again.");

      setFeedback(feedback);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 mt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback(true)}
          disabled={isLoading}
          className={`hover:text-green-600 ${
            feedback === "positive" ? "text-green-600" : "text-gray-500"
          }`}
          aria-label="Thumbs up"
        >
          {isLoading && feedback === "positive" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ThumbsUp className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFeedback(false)}
          disabled={isLoading}
          className={`hover:text-red-600 ${
            feedback === "negative" ? "text-red-600" : "text-gray-500"
          }`}
          aria-label="Thumbs down"
        >
          {isLoading && feedback === "negative" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ThumbsDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FeedbackButtons;
