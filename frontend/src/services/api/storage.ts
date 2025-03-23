import { handleApiResponse, ApiError, API_BASE_URL } from "./base";
import type { UploadResponse, StorageFile } from "./types";

export const storageService = {
  async uploadFile(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise<UploadResponse>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new ApiError(xhr.status, xhr.responseText));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new ApiError(500, "Failed to upload file"));
        });

        xhr.open('POST', `${API_BASE_URL}/storage/upload`);
        xhr.send(formData);
      });

      return uploadPromise;
    } catch (error) {
      console.error("Storage service upload error:", error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Failed to upload file");
    }
  },

  async listFiles(): Promise<StorageFile[]> {
    const response = await fetch(`${API_BASE_URL}/storage/files`);
    return handleApiResponse<StorageFile[]>(response);
  },

  async downloadFile(fileName: string): Promise<Blob> {
    const response = await fetch(
      `${API_BASE_URL}/storage/download/${fileName}`
    );
    if (!response.ok) {
      throw new ApiError(response.status, "Failed to download file");
    }
    return response.blob();
  },
};
