import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Scategorie } from '../api/scategorie';

@Injectable({
  providedIn: 'root',
})
export class ScategorieService {
  private apiBaseUrl = 'http://localhost:8083/api/scategorie';

  constructor(private http: HttpClient) {}

  getScategories() {
    return this.http.get<Scategorie[]>(this.apiBaseUrl).toPromise();
  }

  createScategorie(scategorie: Scategorie) {
    return this.http.post<Scategorie>(this.apiBaseUrl, scategorie).toPromise();
  }

  getScategorieById(id: string) {
    return this.http.get<Scategorie>(`${this.apiBaseUrl}/${id}`).toPromise();
  }

  updateScategorie(id: string, scategorie: Scategorie) {
    return this.http.put<Scategorie>(`${this.apiBaseUrl}/${id}`, scategorie).toPromise();
  }

  deleteScategorie(id: string) {
    return this.http.delete(`${this.apiBaseUrl}/${id}`).toPromise();
  }
}
