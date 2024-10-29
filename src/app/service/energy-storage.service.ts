import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnergyStorageService {
  private apiUrl = 'http://localhost:8082/api/storage';

  constructor(private http: HttpClient) {}

  // Fetch all Energy Storages
  getAllEnergyStorages(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Add a new Energy Storage
  addEnergyStorage(storageName: string, capacity: number, efficiency: number): Observable<any> {
    const params = new HttpParams()
      .set('solutionName', storageName)
      .set('capacity', capacity.toString())
      .set('efficiency', efficiency.toString());

    return this.http.post(`${this.apiUrl}`, {}, { params });
  }

  // Update an existing Energy Storage
  updateEnergyStorage(storageName: string, newCapacity: number, newEfficiency: number): Observable<any> {
    const params = new HttpParams()
      .set('newCapacity', newCapacity.toString())
      .set('newEfficiency', newEfficiency.toString());

    return this.http.put(`${this.apiUrl}/update`, {}, { params });
  }

  // Delete an Energy Storage
  deleteEnergyStorage(storageName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${storageName}`);
  }
}
