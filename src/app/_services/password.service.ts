import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient) { }

  registerPassword(password: string, token: string) {
    const data = { password, token };
    const url = 'http://localhost:8000/api/register-password/' + token; 
    return this.http.post(url, data);
  }
}