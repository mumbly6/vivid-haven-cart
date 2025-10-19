import { Product } from '@/types/product';

const PRODUCTS_KEY = 'havenStyleProducts';

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const loadProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addProduct = (product: Product): void => {
  const products = loadProducts();
  products.push(product);
  saveProducts(products);
};

export const deleteProduct = (id: string): void => {
  const products = loadProducts();
  saveProducts(products.filter(p => p.id !== id));
};
