import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8000/api/';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient) { }
    checkUser(token: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`,
            }),
        };
        return this.http.get(API_URL + 'users/check/:token', httpOptions);
    }
}