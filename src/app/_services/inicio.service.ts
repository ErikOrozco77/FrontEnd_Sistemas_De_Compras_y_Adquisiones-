import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  AUTH_API= 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  inicio(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.AUTH_API}/Login`, body);
  }
}
        