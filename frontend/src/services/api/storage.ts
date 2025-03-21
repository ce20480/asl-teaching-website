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

      const response = await fetch(`${API_BASE_URL}/storage/upload`, {
        method: "POST",
        body: formData,
      });

      return handleApiResponse<UploadResponse>(response);
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
