export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  organizer: string;
}

export interface PreSale {
  id: number;
  fullName: string;
  quantity: number;
  finalPrice: number;
  paymentMethod: string;
  date: string;
}

