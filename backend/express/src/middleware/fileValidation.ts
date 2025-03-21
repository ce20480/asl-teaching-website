import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const validateFileType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedMimes = ["image/jpeg", "image/png", "video/mp4"];

  if (req.file && !allowedMimes.includes(req.file.mimetype)) {
    return res.status(400).json({
      error: "Invalid file type. Only JPG, PNG and MP4 files are allowed",
    });
  }

  next();
};

export const validateFileSize = (maxSize: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.file && req.file.size > maxSize) {
      return res.status(400).json({
        error: `File too large. Maximum size is ${maxSize / (1024 * 1024)}MB`,
      });
    }

    next();
  };
};
