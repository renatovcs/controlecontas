export interface Entry {
  _id: number;
  description: string;
  category: string;
  amount: number;
  type: string;
  currency: string; //BRL, USD...
  eventDate: Date;
  //createdAt: Date;
  //deletedAt: Date;
}
