"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

interface Source {
  filepath: string | null;
  score: number;
}

const SourcesList: React.FC<{ sources: Source[] }> = ({ sources }) => {
  const validSources = sources
    .filter((source) => source.filepath)
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  if (validSources.length === 0) return null;

  return (
    <div className="mt-2">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="sources">
          <AccordionTrigger className="text-sm text-gray-500 hover:text-gray-700">
            View Sources ({validSources.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {validSources.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-md"
                >
                  <Link
                    className="text-blue-600 truncate flex-1"
                    href={source.filepath!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.filepath}
                  </Link>
                  <span className="text-gray-500 ml-2">
                    {(source.score * 100).toFixed(1)}% match
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SourcesList;
