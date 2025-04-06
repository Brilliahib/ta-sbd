import { Product } from "../product/product";

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  payment_proof_url: string;
  is_paid: boolean;
  created_at: Date;
  updated_at: Date;
  product: Product;
}
