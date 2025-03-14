import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Share2, RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface SummaryDisplayProps {
  summary: {
    title: string;
    quickSummary: string[];
    detailedSummary: string[];
  } | null;
  isLoading: boolean;
  onCustomPrompt: (prompt: string) => void;
}

export default function SummaryDisplay({
  summary,
  isLoading,
  onCustomPrompt,
}: SummaryDisplayProps) {
  const [customPrompt, setCustomPrompt] = useState("");
  const [isSubmittingPrompt, setIsSubmittingPrompt] = useState(false);

  const handleSubmitPrompt = () => {
    if (customPrompt.trim()) {
      setIsSubmittingPrompt(true);
      onCustomPrompt(customPrompt);
      // The parent component should handle setting isLoading back to false
      setTimeout(() => setIsSubmittingPrompt(false), 500);
    }
  };

  if (!summary && !isLoading) {
    return null;
  }

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          {isLoading
            ? "Analyzing document..."
            : summary?.title || "Document Summary"}
        </CardTitle>
        <CardDescription>
          {isLoading
            ? "Please wait while we process your document"
            : "Key points extracted from your document"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="h-12 w-12 rounded-full border-4 border-gray-100 border-t-blue-500 animate-spin" />
            <p className="text-sm text-gray-500">
              Extracting insights from your document...
            </p>
          </div>
        ) : (
          <>
            <Tabs defaultValue="quick" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="quick">Quick Summary</TabsTrigger>
                <TabsTrigger value="detailed">Detailed View</TabsTrigger>
              </TabsList>
              <TabsContent value="quick" className="space-y-4">
                <ul className="space-y-2">
                  {summary?.quickSummary.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="detailed" className="space-y-4">
                <ul className="space-y-3">
                  {summary?.detailedSummary.map((point, index) => (
                    <li
                      key={index}
                      className="pb-3 border-b border-gray-100 last:border-0"
                    >
                      <h4 className="font-medium text-gray-900 mb-1">
                        Point {index + 1}
                      </h4>
                      <p className="text-gray-700">{point}</p>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">
                Customize Summary
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                Add a custom prompt to focus the AI on specific aspects of the
                document
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="E.g., Focus on financial implications"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleSubmitPrompt}
                  disabled={isSubmittingPrompt || !customPrompt.trim()}
                >
                  {isSubmittingPrompt ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
      {!isLoading && summary && (
        <CardFooter className="flex justify-end space-x-2 border-t border-gray-100 pt-4">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
