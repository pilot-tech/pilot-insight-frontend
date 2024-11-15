"use client";

import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
  useRef,
} from "react";
import axios, { AxiosError } from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MarkdownRenderer from "./MarkdownRenderer";
import { API_URL } from "@/constants";
import { remark } from "remark";
import html from "remark-html";
import SourcesList from "./SourcesList";
import FeedbackButtons from "./FeedbackButtons";
import SkeletonRenderer from "./MarkdownSkeleton";

interface Source {
  filepath: string | null;
  score: number;
}

interface ChatMessage {
  id: string;
  query: string;
  response: string;
  timestamp: number;
  sources?: Source[];
}

interface ApiResponse {
  answer: string;
  sources?: Source[];
}

const ChatInterface: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [shouldAutoScroll, setShouldAutoScroll] = useState<boolean>(true);

  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (smooth: boolean = true) => {
    if (scrollViewportRef.current && shouldAutoScroll) {
      const scrollElement = scrollViewportRef.current;
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const isAtBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      50;

    setShouldAutoScroll(isAtBottom);
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
      setTimeout(() => scrollToBottom(false), 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSend = async (): Promise<void> => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");
    setError("");
    setShouldAutoScroll(true);

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
      const processedContent = await remark().use(html).process(newResponse);
      const contentHtml = processedContent.toString();
      setResponse(contentHtml);

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        query: query.trim(),
        response: newResponse,
        timestamp: Date.now(),
        sources: res.data.sources,
      };
      setChatHistory((prev) => [...prev, newMessage]);
      setQuery("");
    } catch (err) {
      console.error("Error fetching response:", err);
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ||
            "An error occurred while fetching the response."
          : "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setChatHistory((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? { ...message, feedback: isPositive ? "positive" : "negative" }
          : message
      )
    );
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

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-[#EB723B] mb-4">
            InsightDocs
          </h1>
          <p className="text-gray-500">
            Your AI companion for smarter answers!
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-5xl mx-auto mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="max-w-5xl mx-auto shadow-none border-none bg-gray-100">
          <CardContent className="p-4">
            <ScrollArea className="h-[600px]" onScroll={handleScroll}>
              <div ref={scrollViewportRef} className="space-y-6">
                {chatHistory.map((message, index) => (
                  <div
                    key={message.timestamp}
                    className="space-y-2"
                    ref={
                      index === chatHistory.length - 1 ? lastMessageRef : null
                    }
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-gray-500">Question:</span>
                      <p className="text-gray-700 bg-gray-50 rounded-lg p-2">
                        {message.query}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-gray-500">Answer:</span>
                      <div className="bg-blue-50 rounded-lg ">
                        <MarkdownRenderer content={message.response} />
                        {message.sources && (
                          <SourcesList sources={message.sources} />
                        )}
                        <FeedbackButtons
                          messageId={message.id}
                          query={message.query}
                          response={message.response}
                          sources={message.sources}
                          onFeedback={handleFeedback}
                        />
                      </div>
                    </div>
                    {index < chatHistory.length - 1 && (
                      <hr className="my-4 border-gray-200" />
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="space-y-2">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-gray-500">Question:</span>
                      <p className="text-gray-700 bg-gray-50 rounded-lg p-2">
                        {query}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-gray-500">
                        Generating response...
                      </span>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <SkeletonRenderer />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="max-w-5xl mx-auto flex gap-2 mb-8">
          <Input
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Ask anything..."
            disabled={loading}
            className="flex-1 p-5 text-[15px] rounded-lg bg-gray-200 border-none shadow-lg"
          />

          <Button
            onClick={handleSend}
            disabled={loading || !query.trim()}
            size="icon"
            className="bg-[#EB723B] hover:bg-[#F4B091] h-10 w-10 rounded-lg"
          >
            {loading ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <Send className="text-white hover:bg-[#F4B091]" />
            )}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;
