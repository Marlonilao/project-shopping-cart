import type { Product } from './types';

export const chooseRandomElements = (
  array: Product[],
  n: number = 5,
): Product[] => {
  if (array.length < n) {
    throw new Error(`Array must have at least ${n} elements.`);
  }
  return [...array].sort(() => Math.random() - 0.5).slice(0, n);
};
