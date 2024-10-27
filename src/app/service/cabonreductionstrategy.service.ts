import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CarbonReductionStrategyService {
    private baseUrl = 'http://localhost:8082/carbonreductionstrategies';

    constructor(private http: HttpClient) { }

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

    // GET: Search for a carbon reduction strategy by name
    findCarbonReductionStrategyByName(strategyName: string): Observable<any> {
        const url = `${this.baseUrl}/search/${strategyName}`;
        return this.http.get<any>(url);
    }

    // GET: Find carbon reduction strategies by impact value range
    findCarbonReductionStrategiesByImpactValueRange(minImpactValue: number, maxImpactValue: number): Observable<any> {
        const url = `${this.baseUrl}/impact-value-range/${minImpactValue}/${maxImpactValue}`;
        return this.http.get<any>(url);
    }

    // GET: Find carbon reduction strategies by cost range
    findCarbonReductionStrategiesByCostRange(minCost: number, maxCost: number): Observable<any> {
        const url = `${this.baseUrl}/search/costRange/${minCost}/${maxCost}`;
        return this.http.get<any>(url);
    }

}
