import axios from 'axios';
import type { Expense } from '../types'; // ← tipo importado

const API_URL = 'http://localhost:3001/api/expenses';

export async function getExpenses(): Promise<Expense[]> {
  const response = await axios.get<Expense[]>(API_URL);
  return response.data;
}

export async function createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
  const response = await axios.post<Expense>(API_URL, expense);
  return response.data;
}

export async function updateExpense(id: number, expense: Omit<Expense, 'id'>): Promise<Expense> {
  const response = await axios.put<Expense>(`${API_URL}/${id}`, expense);
  return response.data;
}

export async function deleteExpense(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}


