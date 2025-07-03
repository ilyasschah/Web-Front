import axios from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic API functions
export const apiGet = async <T>(endpoint: string): Promise<T> => {
  const response = await api.get<ApiResponse<T>>(endpoint);
  return response.data.data;
};

export const apiPost = async <T>(endpoint: string, data: any): Promise<T> => {
  const response = await api.post<ApiResponse<T>>(endpoint, data);
  return response.data.data;
};

export const apiPut = async <T>(endpoint: string, data: any): Promise<T> => {
  const response = await api.put<ApiResponse<T>>(endpoint, data);
  return response.data.data;
};

export const apiDelete = async <T>(endpoint: string): Promise<T> => {
  const response = await api.delete<ApiResponse<T>>(endpoint);
  return response.data.data;
};

export const apiGetPaginated = async <T>(
  endpoint: string,
  params?: Record<string, any>
): Promise<PaginatedResponse<T>> => {
  const response = await api.get<PaginatedResponse<T>>(endpoint, { params });
  return response.data;
};