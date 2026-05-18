export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type: 'ready-made' | 'custom';
  customDetails?: {
    base: string;
    ingredients: string[];
  };
};

export type Cart = {
  items: CartItem[];
  total: number;
  itemCount: number;
};