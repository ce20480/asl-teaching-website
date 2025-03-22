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

// Create bucket
router.post("/buckets", async (req, res) => {
  try {
    const { bucketName } = req.body;
    const response = await axios.post(
      `${process.env.PYTHON_API_URL}/api/storage/buckets`,
      { bucketName }
    );
    res.json(response.data);
  } catch (error: any) {
    console.error("Create bucket error:", error.response?.data || error);
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data?.detail || "Failed to create bucket"
    });
  }
});

// List buckets
router.get("/buckets", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.PYTHON_API_URL}/api/storage/buckets`
    );
    res.json(response.data);
  } catch (error: any) {
    console.error("List buckets error:", error.response?.data || error);
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data?.detail || "Failed to list buckets"
    });
  }
});

// Get bucket details
router.get("/buckets/:bucketName", async (req, res) => {
  try {
    const { bucketName } = req.params;
    const response = await axios.get(
      `${process.env.PYTHON_API_URL}/api/storage/buckets/${bucketName}`
    );
    res.json(response.data);
  } catch (error: any) {
    console.error("Get bucket error:", error.response?.data || error);
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data?.detail || "Failed to get bucket details"
    });
  }
});

// List files in bucket
router.get("/buckets/:bucketName/files", async (req, res) => {
  try {
    const { bucketName } = req.params;
    const response = await axios.get(
      `${process.env.PYTHON_API_URL}/api/storage/buckets/${bucketName}/files`
    );
    res.json(response.data);
  } catch (error: any) {
    console.error("List files error:", error.response?.data || error);
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data?.detail || "Failed to list files"
    });
  }
});

// Download file from bucket
router.get("/buckets/:bucketName/files/:fileName/download", async (req, res) => {
  try {
    const { bucketName, fileName } = req.params;
    const response = await axios.get(
      `${process.env.PYTHON_API_URL}/api/storage/buckets/${bucketName}/files/${fileName}/download`,
      { responseType: 'stream' }
    );

    // Set headers for file download
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Pipe the file stream to the response
    response.data.pipe(res);
  } catch (error: any) {
    console.error("Download error:", error.response?.data || error);
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data?.detail || "Failed to download file"
    });
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: "No file provided" 
      });
    }

    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post(
      `${process.env.PYTHON_API_URL}/api/storage/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error("Upload error:", error.response?.data || error);
    res.status(error.response?.status || 500).json({
      success: false,
      error: error.response?.data?.detail || "Failed to upload file"
    });
  }
});

export default router;
