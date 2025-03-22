// Base API types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Storage types
export interface UploadResponse {
  success: boolean;
  data: {
    Name: string;
    Size: number;
    cid: string;
    url: string;
  };
}

export interface StorageFile {
  name: string;
  size: number;
  uploadedAt: string;
}
