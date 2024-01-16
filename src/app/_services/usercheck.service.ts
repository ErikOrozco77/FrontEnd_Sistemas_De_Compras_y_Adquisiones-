import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  checkUser(token: string): Observable<any> {
    return this.http.get(`${this.API_URL}/users/check/:${token}`); 
  }
}
