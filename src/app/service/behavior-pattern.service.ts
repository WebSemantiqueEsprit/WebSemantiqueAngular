import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorPatternService {
  private baseUrl = 'http://localhost:8080/behaviorpatterns';

  constructor(private http: HttpClient) {}

  getAllBehaviorPatterns(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
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
}
