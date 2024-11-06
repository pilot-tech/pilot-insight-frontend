"use client"

import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MarkdownRenderer from "./MarkdownRenderer";
import { API_URL } from "@/constants";

interface ChatMessage {
  query: string;
  response: string;
  timestamp: number;
}

interface ApiResponse {
  answer: string;
}

const ChatInterface: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSend = async (): Promise<void> => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");
    setError("");

    try {
      const res = await axios.post<ApiResponse>(
        `${API_URL}/query/search`,
        { query },
        {
          headers: {
            "Content-Type": "application/json",
            credentials: true,
          },
        }
      );
      const newResponse = res.data.answer || "No response available.";
      setResponse(newResponse);

      // Add new message to chat history
      const newMessage: ChatMessage = {
        query: query.trim(),
        response: newResponse,
        timestamp: Date.now(),
      };
      setChatHistory(prev => [newMessage, ...prev]);
      setQuery("");
    } catch (err) {
      console.error("Error fetching response:", err);
      const errorMessage = err instanceof AxiosError
        ? err.response?.data?.message || "An error occurred while fetching the response."
        : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <Card className="mx-auto shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            InsightDocs
          </CardTitle>
          {chatHistory.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearHistory}
              className="text-gray-500 hover:text-red-500"
              aria-label="Clear history"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Query Input Section */}
          <div className="flex space-x-2">
            <Input
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question..."
              disabled={loading}
              className="flex-1"
              aria-label="Query input"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !query.trim()}
              size="icon"
              aria-label="Send message"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Chat History Section */}
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="space-y-6">
              {chatHistory.map((message, index) => (
                <div key={message.timestamp} className="space-y-2">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">
                      Question:
                    </span>
                    <p className="text-gray-700 bg-gray-50 rounded-lg p-2">
                      {message.query}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-gray-500">
                      Answer:
                    </span>
                    <div className="bg-blue-50 rounded-lg p-2">
                      <MarkdownRenderer content={message.response} />
                    </div>
                  </div>
                  {index < chatHistory.length - 1 && (
                    <hr className="my-4 border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;