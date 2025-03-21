import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Implement proper authentication
  // For now, just passing through all requests
  next();
};
