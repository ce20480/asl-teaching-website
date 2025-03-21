// Base API types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Storage types
export interface UploadResponse {
  message: string;
  result: string;
}

export interface StorageFile {
  name: string;
  size: number;
  uploadedAt: string;
}
