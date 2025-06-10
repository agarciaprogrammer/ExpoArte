import type { PreSale } from '../types';
import api from './api';

export async function getPreSales(): Promise<PreSale[]> {
  const response = await api.get<PreSale[]>('/presales');
  return response.data;
}

export async function createPreSale(data: Omit<PreSale, 'id'>): Promise<PreSale> {
  const response = await api.post<PreSale>('/presales', data);
  return response.data;
}

export async function updatePreSale(
  id: number,
  data: Omit<PreSale, 'id'> & { checkedInCount: number }
): Promise<PreSale> {
  const response = await api.put<PreSale>(`/presales/${id}`, data);
  return response.data;
}

export async function deletePreSale(id: number): Promise<void> {
  await api.delete(`/presales/${id}`);
}
