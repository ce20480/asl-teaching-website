import express from "express";
import multer from "multer";
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
      return res.status(400).json({ 
        success: false,
        error: "No file provided" 
      });
    }

    // Validate file size
    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        error: "File size exceeds 10MB limit"
      });
    }

    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      knownLength: req.file.size,
    });

    console.log("Forwarding upload request to Python API:", {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    const response = await axios.post(
      `${process.env.PYTHON_API_URL}/api/storage/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'Content-Type': 'multipart/form-data',
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    console.log("Upload successful, response:", response.data);
    res.json(response.data);
  } catch (error: any) {
    console.error("Upload error details:", {
      message: error.message,
      response: error.response?.data,
      file: req.file ? {
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype
      } : null
    });
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data?.detail || "Failed to upload file"
    });
  }
});

export default router;
