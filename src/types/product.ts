export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Shoes' | 'Clothes' | 'Accessories';
  description: string;
  image: string;
  originalImage?: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}
