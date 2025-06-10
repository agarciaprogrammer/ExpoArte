import api from './api';

export async function getEntryPrices() {
  const response = await api.get('/config');
  return response.data;
}

export async function updateEntryPrices(prices: {
  ticketPrice: number;
  doorSalePrice: number;
}) {
  const response = await api.put('/config', prices);
  return response.data;
}

export async function downloadPDFReport(): Promise<Blob> {
  const response = await api.get('/config/report', {
    responseType: 'blob',
  });
  return response.data;
}
