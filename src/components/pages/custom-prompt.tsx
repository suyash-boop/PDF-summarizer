import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, RefreshCw, Download, Share2, FileText } from "lucide-react";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";

export default function CustomPrompt() {
  const [customPrompt, setCustomPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<{
    title: string;
    quickSummary: string[];
    detailedSummary: string[];
  } | null>(null);
  const [originalSummary, setOriginalSummary] = useState<{
    title: string;
    quickSummary: string[];
    detailedSummary: string[];
  } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get the summary data from location state
  useEffect(() => {
    if (location.state?.summary) {
      setSummary(location.state.summary);
      setOriginalSummary(location.state.summary);
    } else {
      // If no summary data, redirect back to PDF summarizer
      navigate("/pdf-summarizer");
      toast({
        title: "No summary found",
        description: "Please upload a PDF first to generate a summary.",
        variant: "destructive",
      });
    }
  }, [location.state, navigate, toast]);

  const handleSubmitPrompt = async () => {
    if (!customPrompt.trim()) return;

    setIsProcessing(true);

    try {
      // In a real implementation, you would send the prompt to your backend
      // For now, we'll simulate the API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock updated summary based on the prompt
      const updatedSummary = {
        ...summary!,
        quickSummary: [
          `Based on your prompt "${customPrompt}":`,
          "The financial implications show a positive ROI within 6 months.",
          "Initial investment is offset by projected revenue increase of 15%.",
          "Cost reduction measures will save approximately $250,000 annually.",
          "Risk assessment indicates low financial exposure with high potential gains.",
        ],
        detailedSummary: [
          `As requested in your prompt "${customPrompt}", the financial analysis shows: The initial investment of $1.2M is expected to yield returns within the first 6 months of implementation. This is based on projected revenue increases and cost savings.`,
          "The projected revenue increase of 15% translates to approximately $3.4M in additional annual revenue, based on current market conditions and conservative growth estimates.",
          "Cost reduction measures implemented alongside the new systems will result in operational savings of approximately $250,000 annually, primarily from automation of manual processes and reduced error rates.",
          "The risk assessment conducted by the financial team indicates low financial exposure with high potential gains. The worst-case scenario projects breaking even within 12 months, while the best-case scenario shows returns beginning as early as 4 months post-implementation.",
          "Stakeholder financial interests are protected through phased implementation, allowing for assessment and adjustment at key milestones. This approach minimizes financial risk while maintaining the projected benefits timeline.",
        ],
      };

      setSummary(updatedSummary);

      // Save the prompt and updated summary to history
      // In a real implementation, you would save this to your database
      if (user) {
        // Example of how you might save to Supabase
        // const { error } = await supabase
        //   .from('prompt_history')
        //   .insert({
        //     user_id: user.id,
        //     prompt: customPrompt,
        //     original_summary_id: location.state?.summaryId,
        //     updated_summary: updatedSummary
        //   });
        //
        // if (error) throw error;
      }

      toast({
        title: "Summary updated",
        description: `Summary regenerated with focus on "${customPrompt}".`,
      });
    } catch (error) {
      console.error("Error processing custom prompt:", error);
      toast({
        title: "Error updating summary",
        description:
          "There was a problem processing your custom prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSummary(originalSummary);
    setCustomPrompt("");
    toast({
      title: "Summary reset",
      description: "Reverted to the original summary.",
    });
  };

  const handleDownload = () => {
    // Create a text version of the summary
    const summaryText = `
      ${summary?.title || "Document Summary"}
      
      QUICK SUMMARY:
      ${summary?.quickSummary.map((point, i) => `${i + 1}. ${point}`).join("\n") || ""}
      
      DETAILED SUMMARY:
      ${summary?.detailedSummary.map((point, i) => `Point ${i + 1}: ${point}`).join("\n\n") || ""}
      
      Generated with Summerizer
    `;

    // Create a blob and download link
    const blob = new Blob([summaryText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${summary?.title || "document"}-summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Summary downloaded",
      description: "Your summary has been downloaded as a text file.",
    });
  };

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-gray-100 border-t-blue-500 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Summerizer
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
              ) : (
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="flex items-center text-gray-600 hover:text-gray-900"
              onClick={() => navigate("/pdf-summarizer")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to PDF Summarizer
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Prompt input */}
            <div className="lg:col-span-1">
              <Card className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Customize Summary
                  </CardTitle>
                  <CardDescription>
                    Add a custom prompt to focus the AI on specific aspects of
                    the document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="E.g., Focus on financial implications, or Extract key action items"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="min-h-[150px] resize-none"
                    />
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={handleSubmitPrompt}
                        disabled={isProcessing || !customPrompt.trim()}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Generate New Summary"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        disabled={isProcessing}
                        className="w-full"
                      >
                        Reset to Original
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-medium text-blue-900 mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-700" />
                  Prompt Tips
                </h3>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Be specific about what information you need</li>
                  <li>• Ask for comparisons between different sections</li>
                  <li>• Request extraction of specific data points</li>
                  <li>• Focus on particular themes or topics</li>
                  <li>• Ask for action items or recommendations</li>
                </ul>
              </div>
            </div>

            {/* Right column - Summary display */}
            <div className="lg:col-span-2">
              <Card className="w-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    {summary?.title || "Document Summary"}
                  </CardTitle>
                  <CardDescription>
                    {customPrompt
                      ? `Summary focused on: "${customPrompt}"`
                      : "Key points extracted from your document"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 border-t border-gray-100 pt-4">
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>Summerizer - Powered by AI</p>
            <p className="mt-1">© 2023 Tempo Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
