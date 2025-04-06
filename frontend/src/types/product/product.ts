import { CategoryProduct } from "../category-product/category-product";

export interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
  size: string;
  description: string;
  condition: string;
  brand: string;
  created_at: Date;
  updated_at: Date;
  category: CategoryProduct;
  user: Owner;
}

export interface Owner {
  id: string;
  name: string;
  image_url: string;
}
