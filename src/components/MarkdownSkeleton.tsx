import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRenderer = () => {
  return (
    <div className="space-y-4">
      {/* Title skeleton */}
      <Skeleton className="h-4 w-3/4" />

      {/* Paragraph skeletons */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>

      {/* Code block skeleton */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-24 w-full" />
      </div>

      {/* List skeleton */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-3 w-4/6" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonRenderer;
