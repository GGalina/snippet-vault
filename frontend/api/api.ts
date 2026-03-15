import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

export const getSnippets = (params?: any) => api.get("/snippets", { params });

export const getSnippet = (id: string) => api.get(`/snippets/${id}`);

export const createSnippet = (data: any) => api.post("/snippets", data);

export const updateSnippet = (id: string, data: any) =>
  api.patch(`/snippets/${id}`, data);

export const deleteSnippet = (id: string) => api.delete(`/snippets/${id}`);
