import { Request, Response, NextFunction } from "express";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Basic request validation - can be expanded based on needs
  if (req.method === "POST" && !req.headers["content-type"]) {
    return res.status(400).json({ error: "Content-Type header is required" });
  }
  next();
};
