import type { Product } from './types';

export const getOneProductPerCategory = (products: Product[]): Product[] => {
  const productsByCategory = new Map<number, Product>();

  products.forEach((product) => {
    if (!productsByCategory.has(product.category.id)) {
      productsByCategory.set(product.category.id, product);
    }
  });

  return Array.from(productsByCategory.values());
};
