export const API_BASE_URL = "http://localhost:3000/api";

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = "ApiError";
  }
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    let errorMessage = "An error occurred";
    let errorData;

    if (isJson) {
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
    }

    throw new ApiError(response.status, errorMessage, errorData);
  }

  if (isJson) {
    return response.json();
  }

  throw new Error("Invalid response type");
}
