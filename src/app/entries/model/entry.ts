export interface Entry {
  _id: string;
  description: string;
  category: string;
  invoiceAccessKey: string;
  amount: number;
  type: string;
  currency: string; //BRL, USD...
  company: string;
  eventDate: Date;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}
