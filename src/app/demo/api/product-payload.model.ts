// product-payload.model.ts

export interface ProductPayload {
    code: string;
    name: string;
    description: string;
    price: number;
    qtestock: number;
    inventoryStatus: string;
    category: {
      id: number;
      nomscategorie: string;
      imagescategorie: string;
    };
    image: string;
    rating: string;
    cost: number;
    dateCreated: string;
    sales: any[]; // Assuming sales is an array of some type
  }
  