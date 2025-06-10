// src/services/authService.ts
import type { User } from '../types';
import api from './api';

interface LoginResponse {
  token: string;
  user: User;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', { username, password });
  return response.data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getToken() {
  return localStorage.getItem('token');
}
