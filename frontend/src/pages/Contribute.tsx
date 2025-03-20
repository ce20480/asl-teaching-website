import { useState } from "react";
import { Upload, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Contribute() {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const response = await fetch("http://localhost:8000/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      await response.json();
      toast.success("File uploaded successfully to Akave storage");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contribute</h1>
        <p className="text-muted-foreground mt-2">
          Help improve sign language recognition by contributing your signs
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Sign Language Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center p-8 border-2 border-dashed rounded-lg">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your files here, or click to select files
            </p>
            <Button disabled={isUploading}>
              <FileUp className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Choose File"}
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*,video/*"
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
