import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiBaseUrl = 'http://localhost:8083/api/products';

  constructor(private http: HttpClient) {}

  getProductsSmall() {
    return this.http.get<Product[]>(`${this.apiBaseUrl}/small`).toPromise();
  }

  getProducts() {
    return this.http.get<Product[]>(this.apiBaseUrl).toPromise();
  }z

  saveProduct(product: Product) {
    if (product.id) {
      return this.http.put<Product>(`${this.apiBaseUrl}/${product.id}`, product).toPromise();
    } else {
      return this.http.post<Product>(this.apiBaseUrl, product).toPromise();
    }
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiBaseUrl}/${id}`).toPromise();
  }

  getProductsMixed() {
    return this.http.get<Product[]>(`${this.apiBaseUrl}/mixed`).toPromise();
  }

  getProductsWithOrdersSmall() {
    return this.http.get<Product[]>(`${this.apiBaseUrl}/orders/small`).toPromise();
  }
}
