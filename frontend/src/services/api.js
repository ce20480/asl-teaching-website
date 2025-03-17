// frontend/src/services/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getLessons = async () => {
  const response = await api.get("/lessons");
  return response.data;
};

export const getLesson = async (lessonId) => {
  const response = await api.get(`/lessons/${lessonId}`);
  return response.data;
};

export const detectSign = async (imageData) => {
  const response = await api.post("/detection/detect", { image: imageData });
  return response.data;
};

export default api;
