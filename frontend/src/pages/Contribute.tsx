import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contribute = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contribute</h1>

      <div className="grid gap-6">
        <div className="p-6 rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">
            Upload Sign Language Data
          </h2>
          <p className="text-muted-foreground mb-4">
            Help improve our translation accuracy by contributing your sign
            language recordings
          </p>

          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your files here, or click to select files
            </p>
            <Button variant="outline">Choose Files</Button>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-2">Your Contributions</h2>
          <p className="text-muted-foreground">
            You haven't made any contributions yet
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
