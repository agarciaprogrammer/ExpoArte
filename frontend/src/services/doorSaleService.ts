import type { DoorSale } from '../types/index.ts';
import api from './api';

export async function getDoorSales(): Promise<DoorSale[]> {
  const response = await api.get<DoorSale[]>('/doorsales');
  return response.data;
}

export async function createDoorSale(
  data: Omit<DoorSale, 'id'>
): Promise<DoorSale> {
  const response = await api.post<DoorSale>('/doorsales', data);
  return response.data;
}

export async function updateDoorSale(
  id: number,
  data: Omit<DoorSale, 'id'>
): Promise<DoorSale> {
  const response = await api.put<DoorSale>(`/doorsales/${id}`, data);
  return response.data;
}

export async function deleteDoorSale(id: number): Promise<void> {
  await api.delete(`/doorsales/${id}`);
}

