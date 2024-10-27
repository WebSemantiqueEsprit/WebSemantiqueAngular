import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarbonReductionStrategyService {
  private baseUrl = 'http://localhost:8082/carbonreductionstrategies';

  constructor(private http: HttpClient) {}

  // GET: Get all carbon reduction strategies
  getAllCarbonReductionStrategies(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }


  addCarbonReductionStrategy(newStrategy: any): Observable<any> {
    return this.http.post('http://localhost:8082/carbonreductionstrategies', newStrategy, { responseType: 'text' });
  }


  // PUT: Update an existing carbon reduction strategy
  updateCarbonReductionStrategy(strategyName: string, updatedStrategy: any): Observable<any> {
    const url = `${this.baseUrl}/${strategyName}`;
    return this.http.put(url, updatedStrategy, { responseType: 'text' });
  }

  // DELETE: Delete a carbon reduction strategy
  deleteCarbonReductionStrategy(strategyName: string): Observable<any> {
    const url = `${this.baseUrl}/${strategyName}`;
    return this.http.delete(url, { responseType: 'text' });
  }
}
