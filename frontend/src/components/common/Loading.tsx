import { Loader2 } from "lucide-react";

export function Loading({ className = "", ...props }) {
  return (
    <div className="flex items-center justify-center p-8" {...props}>
      <Loader2
        className={`h-6 w-6 animate-spin text-muted-foreground ${className}`}
      />
    </div>
  );
}
