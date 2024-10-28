import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private baseUrl = 'http://localhost:8082/devices'; // Changez l'URL selon votre backend

  constructor(private http: HttpClient) { }

  getDevices(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  addDevice(device: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, device , { responseType: 'text' });
  }


  updateDevice(deviceName: string, device: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${deviceName}`, device, { responseType: 'text' });
  }


  deleteDevice(deviceName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${deviceName}`, { responseType: 'text' });
  }

  searchDevicesByPowerRating(powerRating: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchByPowerRating?powerRating=${powerRating}`);
  }
  // Dans device.service.ts
getDevicesByPowerRatingRange(minPowerRating: string, maxPowerRating: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/filterByPowerRatingRange`, {
    params: { minPowerRating, maxPowerRating }
  });
}

  
}
