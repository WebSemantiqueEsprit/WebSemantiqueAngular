import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  }
}
