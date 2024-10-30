import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contract {
  contractName: string;
  hasCostContract: string;
  hasDuration: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = 'http://localhost:8082/contracts'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Create a new contract
  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.apiUrl, contract);
  }

  // Get all contracts
  getContracts(): Observable<{contracts: Contract[]}> {
    return this.http.get<{contracts: Contract[]}>(this.apiUrl);
  }

  // Update an existing contract
  updateContract(contractName: string, contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiUrl}/${contractName}`, contract);
  }

  // Delete a contract
  deleteContract(contractName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${contractName}`);
  }searchContracts(contractName?: string, minCost?: number, maxCost?: number, duration?: string): Observable<any> {
    let params = new HttpParams();

    if (contractName) {
      params = params.set('contractName', contractName);
    }
    if (minCost) {
      params = params.set('minCost', minCost.toString());
    }
    if (maxCost) {
      params = params.set('maxCost', maxCost.toString());
    }
    if (duration) {
      params = params.set('duration', duration);
    }

    return this.http.get(`${this.apiUrl}/search`, { params });
  }

}
