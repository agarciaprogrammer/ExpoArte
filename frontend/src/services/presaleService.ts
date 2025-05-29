import axios from 'axios';
import type { PreSale } from '../types';

const API_URL = 'http://localhost:3001/api/presales';

export async function getPreSales(): Promise<PreSale[]> {
  const response = await axios.get<PreSale[]>(API_URL);
  return response.data;
}

export async function createPreSale(data: Omit<PreSale, 'id'>): Promise<PreSale> {
  const response = await axios.post<PreSale>(API_URL, data);
  return response.data;
}

export async function updatePreSale(id: number, data: Omit<PreSale, 'id'>): Promise<PreSale> {
  const response = await axios.put<PreSale>(`${API_URL}/${id}`, data);
  return response.data;
}

export async function deletePreSale(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
