import express from "express";
import cors from "cors";
import { uploadLimiter, inferenceLimiter } from "./middleware/rateLimiter";
import { validateRequest } from "./middleware/validation";
import { authMiddleware } from "./middleware/auth";

const app = express();
const PYTHON_API = process.env.PYTHON_API || "http://localhost:8000";

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Storage routes with rate limiting
app.use("/api/storage", uploadLimiter, require("./routes/storage"));

// Compute routes with rate limiting
app.use("/api/compute", inferenceLimiter, require("./routes/compute"));

// ML routes
app.use("/api/ml", require("./routes/ml"));

app.listen(3000, () => {
  console.log("Express gateway running on port 3000");
});
