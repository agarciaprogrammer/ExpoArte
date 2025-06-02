import axios from 'axios';
import type { DoorSale } from '../types/index.ts';

const API_URL = 'http://localhost:3001/api/doorsales';

export async function getDoorSales(): Promise<DoorSale[]> {
  const response = await axios.get<DoorSale[]>(API_URL);
  return response.data;
}

export async function createDoorSale(
  data: Omit<DoorSale, 'id'>
): Promise<DoorSale> {
  const response = await axios.post<DoorSale>(API_URL, data);
  return response.data;
}

export async function updateDoorSale( id: number, data: Omit<DoorSale, 'id'>): Promise<DoorSale> {
  const response = await axios.put<DoorSale>(`${API_URL}/${id}`, data);
  return response.data;

}

export async function deleteDoorSale(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}

