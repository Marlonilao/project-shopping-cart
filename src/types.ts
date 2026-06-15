export interface Product {
  category: Category;
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  slug: string;
}

export interface Category {
  id: number;
  image: string;
  name: string;
  slug: string;
}
