// carbonfootprint.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {
  private apiUrl = 'http://localhost:8082/carbonfootprints'; // URL to the API

  constructor(private http: HttpClient) {}

  // Method to fetch carbon footprints
  getCarbonFootprints(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteCarbonFootprint(footprintName: string): Observable<any> {
    return this.http.delete(`http://localhost:8082/carbonfootprints/${footprintName}`, { responseType: 'text' });
  }

  addCarbonFootprint(footprint: any): Observable<any> {
    return this.http.post('http://localhost:8082/carbonfootprints', footprint, { responseType: 'text' });
  }

  updateCarbonFootprint(footprintName: string, footprint: any): Observable<any> {
    return this.http.put(`http://localhost:8082/carbonfootprints/${footprintName}`, footprint, { responseType: 'text' });
  }
  
}
