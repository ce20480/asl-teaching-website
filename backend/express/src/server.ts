import express from "express";
import cors from "cors";
import { config } from "@/config";
import { uploadLimiter, inferenceLimiter } from "@/middleware/rateLimiter";
import { validateRequest } from "@/middleware/validation";
import { authMiddleware } from "@/middleware/auth";
import {
  validateFileType,
  validateFileSize,
} from "@/middleware/fileValidation";
import storageRoutes from "@/routes/storage/upload";

const app = express();

app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(validateRequest);
app.use(authMiddleware);

// Routes with specific middleware
app.use(
  "/api/storage",
  uploadLimiter,
  validateFileSize(10 * 1024 * 1024), // 10MB limit
  validateFileType,
  storageRoutes
);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Server error:", err);
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(`Environment: ${config.environment}`);
});
