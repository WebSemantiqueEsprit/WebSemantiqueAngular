import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnergySourceService {
  private baseUrl = 'http://localhost:8082/energy-sources'; // Adjust if your backend URL is different
  constructor(private http: HttpClient) {}

  // Obtenir toutes les sources d'énergie

  getEnergySources(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  addEnergySource(energySource: any): Observable<void> {
    return this.http.post<void>(this.baseUrl, energySource);
  }

  updateEnergySource(energyType: string, energySource: any): Observable<void> {
    return this.http.put<void>(this.baseUrl, energySource);
  }

  deleteEnergySource(energyType: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${energyType}`);
  }

  getEnergySourcesByRenewablePercentageRange(minPercentage: string, maxPercentage: string): Observable<any> {
    const params = new HttpParams()
      .set('minPercentage', minPercentage)
      .set('maxPercentage', maxPercentage);
    return this.http.get<any>(`${this.baseUrl}/renewable-percentage`, { params });
  }

  searchEnergySourcesByType(energyType: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/renewable-percentage/${energyType}`);
  }
}
