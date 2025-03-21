import { useState } from "react";
import { Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  accept?: string;
  maxSize?: number; // in bytes
}

export function FileUpload({
  onFileSelect,
  onRemove,
  accept = "image/*,video/*",
  maxSize = 10 * 1024 * 1024, // 10MB default
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    // Create preview
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    setError(null);
    onFileSelect(file);
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setError(null);
    onRemove();
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div className="border-2 border-dashed rounded-lg p-8 hover:border-primary/50 transition-colors">
          <div className="flex flex-col items-center gap-4">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop your file here, or click to select
              </p>
              <p className="text-xs text-muted-foreground">
                Max file size: {maxSize / (1024 * 1024)}MB
              </p>
            </div>
            <Button variant="secondary">
              Choose File
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept={accept}
              />
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-4">
            {preview.startsWith("data:image") || preview.startsWith("blob:") ? (
              <img
                src={preview}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-md"
              />
            ) : (
              <video
                src={preview}
                className="h-20 w-20 object-cover rounded-md"
                controls
              />
            )}
            <div className="flex-1">
              <p className="font-medium">Ready to upload</p>
              <p className="text-sm text-muted-foreground">
                Click upload to store on Filecoin network
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
}
