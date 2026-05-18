export type Chocolate = {
  id: number;
  name: string;
  ingredients: string;
  photo_urls: string[];
};

export type Variants = {
  id: number;
  chocolate_id: number;
  size: string;
  weight: number;
  price: number;
};
