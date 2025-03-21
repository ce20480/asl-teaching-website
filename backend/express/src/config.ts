import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  pythonApiUrl: process.env.PYTHON_API_URL || "http://localhost:8000",
  environment: process.env.NODE_ENV || "development",
  corsOrigins: [
    "http://localhost:5173",
    "http://localhost:5174",
    // Add any other allowed origins
  ],
};
