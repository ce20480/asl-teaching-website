import express from "express";
import multer from "multer";
import { config } from "@/config";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    console.log("Received file:", req.file.originalname);

    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    console.log(
      "Forwarding to Python backend:",
      `${config.pythonApiUrl}/api/storage/upload`
    );

    const response = await axios.post(
      `${config.pythonApiUrl}/api/storage/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    console.log("Python response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Upload error:", error.response?.data || error);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.detail || "Failed to upload file",
    });
  }
});

export default router;
