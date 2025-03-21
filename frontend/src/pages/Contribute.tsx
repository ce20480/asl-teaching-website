import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/features/upload/FileUpload";
import { storageService } from "@/services/api";
import { ApiError } from "@/services/api/base";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

export default function Contribute() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const result = await storageService.uploadFile(
        selectedFile,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      console.log("Upload successful:", result);
      toast.success("File successfully uploaded to Filecoin network!");
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error details:", error);

      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error during upload");
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contribute</h1>
        <p className="text-muted-foreground mt-2">
          Help improve sign language recognition by contributing your signs
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Sign Language Data</CardTitle>
          <CardDescription>
            Upload images or videos of sign language gestures to help train our
            model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            onFileSelect={handleFileSelect}
            onRemove={() => setSelectedFile(null)}
            accept="image/*,video/*"
            maxSize={10 * 1024 * 1024} // 10MB
          />

          {selectedFile && (
            <div className="space-y-4">
              {isUploading && (
                <Progress value={uploadProgress} className="w-full" />
              )}
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full"
              >
                {isUploading
                  ? "Uploading to Filecoin..."
                  : "Upload to Filecoin"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
