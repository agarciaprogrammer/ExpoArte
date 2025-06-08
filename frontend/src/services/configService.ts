import axios from 'axios';

const API_URL = 'http://localhost:3001/api/config';


export async function getEntryPrices() {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function updateEntryPrices(prices: {
  ticketPrice: number;
  doorSalePrice: number;
}) {
  const token = localStorage.getItem('token');
  const response = await axios.put(API_URL, prices, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `${API_URL}/change-password`,
    { currentPassword, newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function downloadPDFReport(): Promise<Blob> {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/report`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });
  return response.data;
}
