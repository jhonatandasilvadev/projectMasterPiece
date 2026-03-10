export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  preparationTime: number;
};

export type Category = {
  id: string;
  name: string;
  products: Product[];
};

export type Menu = {
  id: string;
  name: string;
  categories: Category[];
};

export type CartItem = {
  product: Product;
  quantity: number;
  notes?: string;
};

export type OrderStatus = 'RECEIVED' | 'PREPARING' | 'READY' | 'DELIVERED';

export type Order = {
  id: string;
  tabId: string;
  companyId: string;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
  items: Array<{
    id: string;
    product: Product;
    quantity: number;
    notes?: string;
  }>;
};
