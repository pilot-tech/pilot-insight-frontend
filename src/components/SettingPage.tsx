"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatabaseManager } from "./DatabaseManager";

const SettingsPage = ({ session }: { session: any }) => {
  if (!session) {
    return null; // The redirect will be handled by the server wrapper
  }

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
          <DatabaseManager />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
