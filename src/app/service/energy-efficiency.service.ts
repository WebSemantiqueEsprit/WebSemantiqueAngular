import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnergyEfficiencyService {
  private baseUrl = 'http://localhost:8082/energy-efficiencies';

  constructor(private http: HttpClient) {}

  // Get all energy efficiencies with optional filters
  getEnergyEfficiencies(rating?: string, minSavings?: number, maxSavings?: number): Observable<any> {
    let params = new HttpParams();
    if (rating) params = params.set('rating', rating);
    if (minSavings) params = params.set('minSavingsPotential', minSavings.toString());
    if (maxSavings) params = params.set('maxSavingsPotential', maxSavings.toString());

    return this.http.get(this.baseUrl, { params });
  }

  // Add a new energy efficiency record
  addEnergyEfficiency(efficiency: any): Observable<any> {
    return this.http.post(this.baseUrl, efficiency);
  }

  // Update an existing energy efficiency record
  updateEnergyEfficiency(efficiencyName: string, efficiency: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${efficiencyName}`, efficiency);
  }

  // Delete an energy efficiency record
  deleteEnergyEfficiency(efficiencyName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${efficiencyName}`);
  }

  // Search energy efficiency by name
  searchEnergyEfficiency(efficiencyName: string): Observable<any> {
    const params = new HttpParams().set('efficiencyName', efficiencyName);
    return this.http.get(`${this.baseUrl}/search`, { params });
  }

  // Filter energy efficiencies by rating and minimum savings potential
  filterEnergyEfficiencies(rating: string, minSavingsPotential: number): Observable<any> {
    // Validate inputs
    if (!rating || minSavingsPotential == null) {
      throw new Error('Both rating and minSavingsPotential are required');
    }

    const params = new HttpParams()
      .set('rating', rating)
      .set('minSavingsPotential', minSavingsPotential.toString());

    return this.http.get<any>(`${this.baseUrl}/filter`, { params });
  }

}
