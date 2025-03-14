import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  onFileSelected: (file: File) => void;
  isUploading?: boolean;
}

export default function UploadArea({
  onFileSelected,
  isUploading = false,
}: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        onFileSelected(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileSelected(selectedFile);
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 bg-white/50 backdrop-blur-sm",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
        isUploading
          ? "opacity-70 cursor-not-allowed"
          : "cursor-pointer hover:border-blue-400 hover:bg-blue-50/50",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
          {isUploading ? (
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          ) : (
            <FileUp className="h-8 w-8 text-blue-500" />
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-medium text-gray-900">
            {file ? file.name : "What can I help with?"}
          </h3>
          <p className="text-sm text-gray-500">
            {file
              ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
              : "Drag and drop your file here or click to browse"}
          </p>
        </div>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <label htmlFor="file-upload">
          <Button variant="outline" className="mt-2" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Select PDF"
            )}
          </Button>
        </label>
      </div>
    </div>
  );
}
