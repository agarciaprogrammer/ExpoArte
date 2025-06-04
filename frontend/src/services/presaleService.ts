import axios from 'axios';
import type { PreSale } from '../types';

const API_URL = 'http://localhost:3001/api/presales';

export async function getPreSales(): Promise<PreSale[]> {
  const token = localStorage.getItem('token');
  const response = await axios.get<PreSale[]>(API_URL, {
    headers: {Authorization: `Bearer ${token}`},    
  });
  return response.data;
}

export async function createPreSale(data: Omit<PreSale, 'id'>): Promise<PreSale> {
  const token = localStorage.getItem('token');
  const response = await axios.post<PreSale>(API_URL, data, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return response.data;
}

export async function updatePreSale(
    id: number,
    data: Omit<PreSale, 'id'> & { checkedInCount: number }
  ): Promise<PreSale> {
    const token = localStorage.getItem('token');
    const response = await axios.put<PreSale>(`${API_URL}/${id}`, data, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
}


export async function deletePreSale(id: number): Promise<void> {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/${id}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
}
