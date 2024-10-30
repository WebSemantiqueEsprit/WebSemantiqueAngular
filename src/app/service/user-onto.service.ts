import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserOntoService {

  private apiUrl = 'http://localhost:8082/users'; // URL to the API

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/all');
  }

  deleteUser(UserName: string): Observable<any> {
    return this.http.delete(this.apiUrl+`/${UserName}`, { responseType: 'text' });
  }

  addUser(User: any): Observable<any> {
    return this.http.post(this.apiUrl+'/add', User, { responseType: 'text' });
  }

  updateUser(UserName: string, User: any): Observable<any> {
    return this.http.put(this.apiUrl+`/${UserName}`, User, { responseType: 'text' });
  }

  searchUser(UserName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?UserName=${UserName}`);
  }

  filterUser(carbonFootprintGoal: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filter?carbonFootprintGoal=${carbonFootprintGoal}`);
  }

}
