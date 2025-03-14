import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import UploadArea from "@/components/pdf/UploadArea";
import SummaryDisplay from "@/components/pdf/SummaryDisplay";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";

export default function PDFSummarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [summary, setSummary] = useState<{
    title: string;
    quickSummary: string[];
    detailedSummary: string[];
  } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleFileSelected = async (selectedFile: File) => {
    setFile(selectedFile);
    await processFile(selectedFile);
  };

  const processFile = async (fileToProcess: File) => {
    setIsUploading(true);

    try {
      // Simulate file upload and processing
      // In a real implementation, you would upload to Supabase storage
      // and then call an API to process the PDF

      // Example of how you might upload to Supabase storage:
      // const { data, error } = await supabase.storage
      //   .from('pdfs')
      //   .upload(`${user?.id}/${Date.now()}-${fileToProcess.name}`, fileToProcess);

      // if (error) throw error;

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock response
      setSummary({
        title: fileToProcess.name.replace(".pdf", ""),
        quickSummary: [
          "The document discusses key financial projections for Q3 2023.",
          "Revenue is expected to increase by 15% compared to previous quarter.",
          "New product line launch scheduled for August 2023.",
          "Market expansion into European territories planned for September.",
          "Budget allocations have been adjusted to accommodate marketing campaigns.",
        ],
        detailedSummary: [
          "Financial projections for Q3 2023 indicate a strong growth trajectory with revenue expected to increase by 15% compared to Q2. This growth is primarily driven by the expansion of the core product line and increased customer retention rates.",
          "The new product line, codenamed 'Phoenix', is scheduled for launch in August 2023. Initial production runs have been completed and marketing materials are in final review. Pre-orders have exceeded expectations by 30%.",
          "Market expansion into European territories, specifically Germany, France, and Spain, is planned for September 2023. Local teams have been established and regulatory compliance is on track. Distribution partnerships have been secured in all target markets.",
          "Budget allocations for Q3 have been adjusted to accommodate increased marketing campaigns associated with both the new product launch and European expansion. The marketing budget has been increased by 25% while R&D has been temporarily reduced by 10%.",
          "Customer feedback from beta testing of the new product line has been overwhelmingly positive, with a satisfaction rating of 4.8/5. Key improvements based on feedback have been incorporated into the final product design.",
        ],
      });

      toast({
        title: "Document processed successfully",
        description: "Your PDF has been analyzed and summarized.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Error processing document",
        description:
          "There was a problem analyzing your PDF. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCustomPrompt = async (prompt: string) => {
    // Navigate to the custom prompt page with the current summary
    navigate("/custom-prompt", { state: { summary, summaryId: "mock-id" } });
  };

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
                <Button variant="ghost" onClick={() => signOut()}>
                  Sign Out
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
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Summerizer
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Let's start by uploading a PDF
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <UploadArea
                onFileSelected={handleFileSelected}
                isUploading={isUploading}
              />

              {!file && !summary && (
                <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">
                    How it works
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-blue-800">
                    <li>Upload your PDF document</li>
                    <li>Our AI analyzes the content</li>
                    <li>Review the generated summary</li>
                    <li>Customize with specific prompts if needed</li>
                    <li>Download or share your summary</li>
                  </ol>
                </div>
              )}
            </div>

            <div>
              <SummaryDisplay
                summary={summary}
                isLoading={isUploading}
                onCustomPrompt={handleCustomPrompt}
              />
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
