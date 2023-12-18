import { Sale } from "./sale";
import { Scategorie } from "./scategorie";

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  qtestock?: number;
  inventoryStatus?: InventoryStatus;
  category?: Scategorie;
  image?: string;
  rating?: string;
  cost?: number;
  dateCreated?: string; // Adjust the type accordingly based on your backend model (e.g., string or Date)
  sales?: Sale[];
}

export interface InventoryStatus {
  label: string;
  value: string;
}
