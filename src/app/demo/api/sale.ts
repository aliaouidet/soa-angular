import { Product } from "./product";

export interface Sale {
    id?: string;
    date?: string; // Adjust the type accordingly based on your backend model (e.g., string or Date)
    amount?: number;
    product?: Product;
  }