// carbonfootprint.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintService {
  private apiUrl = 'http://localhost:8082/carbonfootprints'; // URL to the API

  constructor(private http: HttpClient) { }

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

  searchCarbonFootprint(value: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?value=${value}`);
  }

  // Fonction de filtrage des empreintes carbone par valeurs minimales et maximales
  filterCarbonFootprint(minValue: number | null, maxValue: number | null): Observable<any> {
    let params = new HttpParams();
    if (minValue !== null) {
      params = params.set('minValue', minValue.toString());
    }
    if (maxValue !== null) {
      params = params.set('maxValue', maxValue.toString());
    }
    return this.http.get<any>(`${this.apiUrl}/searchByRange`, { params });
  }

  // Fonction pour ajouter une nouvelle relation entre CarbonFootprint et CarbonReductionStrategy
  addRelation(relationName: string): Observable<any> {
    const params = new HttpParams().set('relationName', relationName);
    return this.http.post(`${this.apiUrl}/addRelation`, {}, { params, responseType: 'text' });
  }

  // Fonction pour obtenir la liste des relations disponibles
  getRelations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/relations`);
  }

  // Fonction pour ajouter une instance avec une relation
  addInstanceWithRelation(
    footprintName: string,
    reductionStrategyName: string,
    carbonValue: number,
    type: string,
    relationName: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('footprintName', footprintName)
      .set('reductionStrategyName', reductionStrategyName)
      .set('carbonValue', carbonValue.toString())
      .set('type', type)
      .set('relationName', relationName);

    return this.http.post(`${this.apiUrl}/addInstanceWithRelation`, {}, { params, responseType: 'text' });
  }
}
