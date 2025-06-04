// src/services/authService.ts
import axios from 'axios';
import type { User } from '../types';

interface LoginResponse {
  token: string;
  user: User;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>('/api/auth/login', {
    username,
    password
  });
  return response.data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getToken() {
  return localStorage.getItem('token');
}
