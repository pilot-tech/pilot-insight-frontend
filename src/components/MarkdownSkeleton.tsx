import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Code, FileText, ListChecks } from "lucide-react";

const SkeletonRenderer = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev < 3 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg border border-gray-200">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-in-out"
          style={{ width: `${(stage + 1) * 25}%` }}
        />
      </div>

      {/* Title section */}
      <div className="relative">
        {stage < 1 ? (
          <Skeleton className="h-8 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300" />
        ) : (
          <div className="transform transition-all duration-500 ease-out animate-slide-up">
            <div className="flex items-center space-x-3">
              <FileText className="text-blue-500 animate-pulse" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Analyzing Your Request
              </h2>
            </div>
          </div>
        )}
      </div>

      {/* Paragraph section */}
      <div className="space-y-4">
        {stage < 2 ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300" />
            <Skeleton className="h-4 w-5/6 bg-gradient-to-r from-gray-200 to-gray-300" />
            <Skeleton className="h-4 w-4/6 bg-gradient-to-r from-gray-200 to-gray-300" />
          </div>
        ) : (
          <div className="transform transition-all duration-500 ease-out animate-slide-up">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <ArrowRight className="text-purple-500 mt-1 animate-bounce-subtle" />
                <p className="text-gray-700 leading-relaxed">
                  We&apos;re processing your information and gathering relevant data.
                  This comprehensive analysis ensures the highest quality
                  results tailored to your specific needs.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code block section */}
      <div className="space-y-3">
        {stage < 3 ? (
          <>
            <Skeleton className="h-5 w-1/4 bg-gradient-to-r from-gray-200 to-gray-300" />
            <Skeleton className="h-32 w-full bg-gradient-to-r from-gray-200 to-gray-300" />
          </>
        ) : (
          <div className="transform transition-all duration-500 ease-out animate-slide-up">
            <div className="flex items-center space-x-2 mb-2">
              <Code className="text-green-500" />
              <p className="text-sm text-gray-600">
                Generating optimized solution...
              </p>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg shadow-lg font-mono text-sm overflow-hidden">
              <div className="animate-typing">
                <span className="text-purple-400">function</span>{" "}
                <span className="text-yellow-400">processData</span>() {"{"}
                <br />
                &nbsp;&nbsp;
                <span className="text-green-400">	&rarr; Optimizing...</span>
                <br />
                {"}"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* List section */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <ListChecks className="text-gray-400" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-2 w-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-300" />
              <Skeleton className="h-4 w-5/6 bg-gradient-to-r from-gray-200 to-gray-300" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-2 w-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-300" />
              <Skeleton className="h-4 w-4/6 bg-gradient-to-r from-gray-200 to-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes typing {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes bounceSoft {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(3px);
    }
  }

  .animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
  }

  .animate-typing {
    animation: typing 1s steps(20, end) forwards;
  }

  .animate-bounce-subtle {
    animation: bounceSoft 2s infinite;
  }
`;

export default SkeletonRenderer;
