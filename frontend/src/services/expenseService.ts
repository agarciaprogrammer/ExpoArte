import axios from 'axios';

const API_URL = 'http://localhost:3001/api/expenses'; // Ajustalo según tu backend

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  organizer: string;
}

export async function getExpenses(): Promise<Expense[]> {
  const response = await axios.get<Expense[]>(API_URL);
  return response.data;
}

export async function createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
  const response = await axios.post<Expense>(API_URL, expense);
  return response.data;
}
