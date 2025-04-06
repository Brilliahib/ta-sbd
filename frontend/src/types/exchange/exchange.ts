import { Product } from "../product/product";

export interface Exchange {
  id: string;
  user_id: string;
  product_id: string;
  name_product: string;
  image_url_product: string;
  brand_product: string;
  size_product: string;
  condition: string;
  is_accepted: boolean;
  created_at: Date;
  updated_at: Date;
  product: Product;
}
