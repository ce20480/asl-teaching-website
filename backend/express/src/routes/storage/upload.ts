import express from "express";
import { uploadLimiter } from "../middleware/rateLimit";
import axios from "axios";

const router = express.Router();
const PYTHON_API = "http://localhost:8000";

router.post("/upload", uploadLimiter, async (req, res) => {
  try {
    const response = await axios.post(
      `${PYTHON_API}/api/storage/upload`,
      req.body,
      {
        headers: req.headers,
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error proxying to Python backend:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
