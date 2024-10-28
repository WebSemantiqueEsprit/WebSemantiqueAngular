import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorPatternService {
  private baseUrl = 'http://localhost:8082/behaviorpatterns';

  constructor(private http: HttpClient) {}

  getAllBehaviorPatterns(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  addBehaviorPattern(newPattern: any): Observable<string> {
    return this.http.post<string>(this.baseUrl, newPattern);
  }

  updateBehaviorPattern(name: string, updatedPattern: any): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${name}`, updatedPattern);
  }

  deleteBehaviorPattern(name: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${name}`);
  }

  getBehaviorPatternsWithCarbonReductionStrategy(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/carbon-reduction`);
  }
  searchBehaviorPatterns(usagePattern?: string, minReductionPotential?: number): Observable<any[]> {
    let params: any = {};
    if (usagePattern) {
      params.usagePattern = usagePattern;
    }
    if (minReductionPotential !== undefined) {
      params.minReductionPotential = minReductionPotential;
    }
    return this.http.get<any[]>(`${this.baseUrl}/search`, { params });
  }

  // Method to filter Behavior Patterns by usage pattern and maximum reduction potential
  filterBehaviorPatterns(usagePattern?: string, maxReductionPotential?: number): Observable<any[]> {
    let params: any = {};
    if (usagePattern) {
      params.usagePattern = usagePattern;
    }
    if (maxReductionPotential !== undefined) {
      params.maxReductionPotential = maxReductionPotential;
    }
    return this.http.get<any[]>(`${this.baseUrl}/filter`, { params });
  }
}
