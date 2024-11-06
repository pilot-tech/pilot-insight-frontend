"use client";
import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Database, FileUp, RotateCcw } from "lucide-react";
import { API_URL } from "@/constants";

const SettingsPage = () => {
  const [loading, setLoading] = useState({
    confluence: false,
    markdown: false,
    reset: false,
  });
  const [status, setStatus] = useState({
    message: "",
    type: "", // 'success' or 'error'
  });

  const handleOperation = async (
    operation: "confluence" | "markdown" | "reset"
  ) => {
    setLoading((prev) => ({ ...prev, [operation]: true }));
    setStatus({ message: "", type: "" });

    try {
      const endpoints = {
        confluence: `${API_URL}/database/populate`,
        markdown: `${API_URL}/database/populate-md`,
        reset: `${API_URL}/database/reset`,
      };
      
      const response = await fetch(endpoints[operation], {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Operation failed: ${response.statusText}`);
      }

      const data = await response.json();
      setStatus({
        message:
          data.message || `${operation} operation completed successfully`,
        type: "success",
      });
    } catch (error) {
      setStatus({
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setLoading((prev) => ({ ...prev, [operation]: false }));
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex items-center justify-center">
      <Card className="w-full max-w-screen-xl mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Database Management</CardTitle>
          <CardDescription className="text-lg">
            Manage your document database and content synchronization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {status.message && (
            <Alert
              variant={status.type === "error" ? "destructive" : "default"}
            >
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-3">
              <Button
                variant="default"
                size="lg"
                className="w-full h-20 text-lg"
                onClick={() => handleOperation("confluence")}
                disabled={loading.confluence}
              >
                {loading.confluence ? (
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                ) : (
                  <Database className="mr-3 h-6 w-6" />
                )}
                Upload Confluence Data
              </Button>
              <p className="text-base text-gray-500 text-center">
                Sync your Confluence documentation with the database
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button
                variant="default"
                size="lg"
                className="w-full h-20 text-lg"
                onClick={() => handleOperation("markdown")}
                disabled={loading.markdown}
              >
                {loading.markdown ? (
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                ) : (
                  <FileUp className="mr-3 h-6 w-6" />
                )}
                Upload Markdown Files
              </Button>
              <p className="text-base text-gray-500 text-center">
                Import your markdown documentation into the database
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button
                variant="destructive"
                size="lg"
                className="w-full h-20 text-lg"
                onClick={() => handleOperation("reset")}
                disabled={true}
              >
                {loading.reset ? (
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                ) : (
                  <RotateCcw className="mr-3 h-6 w-6" />
                )}
                Reset Database
              </Button>
              <p className="text-base text-gray-500 text-center">
                Clear all data and reset the database to its initial state
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
