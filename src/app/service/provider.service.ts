// src/app/service/provider.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/models/Provider'; // Import the Provider type

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private baseUrl = 'http://localhost:8082/providers'; // Your Spring Boot server URL

  constructor(private http: HttpClient) {}

  // Create a new provider
  createProvider(providerData: Provider): Observable<string> {
    return this.http.post<string>(this.baseUrl, providerData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Get a provider by name
  getProvider(providerName: string): Observable<Provider> {
    return this.http.get<Provider>(`${this.baseUrl}/${providerName}`);
  }

  // Update an existing provider
  updateProvider(providerName: string, updatedData: Provider): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${providerName}`, updatedData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Delete a provider
  deleteProvider(providerName: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${providerName}`);
  }

  // Get all providers
  getAllProviders(): Observable<{ providers: Provider[] }> { // Specify the return type correctly
    return this.http.get<{ providers: Provider[] }>(this.baseUrl);
  }
}
