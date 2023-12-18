import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:8083/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardStatistics(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/statistics`);

  }


  getAverageProductPrice(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/averagePrice`);
  }
      
  getAverageProfitMargin(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/averageProfitMargin`);
  }
}
