import { Camera, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCamera from "@/hooks/useCamera";

const Translate = () => {
  const { videoRef, isRecording, startCamera, stopCamera } = useCamera();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Sign Language Translator
          </h1>
          <p className="text-muted-foreground mt-2">
            Use your camera to translate sign language in real-time
          </p>
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Camera Feed</CardTitle>
            <Button
              onClick={isRecording ? stopCamera : startCamera}
              variant={isRecording ? "destructive" : "default"}
              size="sm"
            >
              <Camera className="mr-2 h-4 w-4" />
              {isRecording ? "Stop Camera" : "Start Camera"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {!isRecording && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Start camera to begin translation
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Translation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-center justify-center text-muted-foreground">
            Translation results will appear here in real-time
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Translate;
