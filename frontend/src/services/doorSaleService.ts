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

