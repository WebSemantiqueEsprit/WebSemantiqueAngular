import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConnsamationEnergieService {
  private apiUrl = 'http://localhost:8082/energy-consumptions'; // URL to the API

  constructor(private http: HttpClient) {}

  getEnergieConsumption(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/all');
  }

  deleteEnergieConsumption(EnergieConsumptionName: string): Observable<any> {
    return this.http.delete(this.apiUrl+`/${EnergieConsumptionName}`, { responseType: 'text' });
  }

  addEnergieConsumption(EnergieConsumption: any): Observable<any> {
    return this.http.post(this.apiUrl+'/add', EnergieConsumption, { responseType: 'text' });
  }

  updateEnergieConsumption(EnergieConsumptionName: string, energyName: any): Observable<any> {
    return this.http.put(this.apiUrl+`/${EnergieConsumptionName}`, energyName, { responseType: 'text' });
  }

  searchEnergyEfficiency(efficiencyName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?efficiencyName=${efficiencyName}`);
  }

}
