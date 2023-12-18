import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../api/sale';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private apiBaseUrl = 'http://localhost:8083/api/sales';

  constructor(private http: HttpClient) {}

  getAllSales() {
    return this.http.get<Sale[]>(this.apiBaseUrl).toPromise();
  }

  getSaleById(id: string) {
    return this.http.get<Sale>(`${this.apiBaseUrl}/${id}`).toPromise();
  }

  createSale(sale: Sale) {
    return this.http.post<Sale>(this.apiBaseUrl, sale).toPromise();
  }

  updateSale(id: string, sale: Sale) {
    return this.http.put<Sale>(`${this.apiBaseUrl}/${id}`, sale).toPromise();
  }

  deleteSale(id: string) {
    return this.http.delete(`${this.apiBaseUrl}/${id}`).toPromise();
  }
}
