import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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


  requestPasswordReset(email: string, recaptchaToken: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = { email: email, recaptchaToken: recaptchaToken };
    return this.http.post<any>('http://localhost:8000/api/' + 'reset/request',  body, httpOptions);
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post('http://localhost:8000/api/' + `new-password/${token}`, { password: newPassword });
  }

}