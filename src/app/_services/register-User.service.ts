import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8000/api/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class Userregister {
    isLoggedIn() {
        throw new Error('Method not implemented.');
    }
    constructor(private http: HttpClient) { }

    login(username: string, correo: string): Observable<any> {
        return this.http.post(AUTH_API + 'register', { username, correo, }, httpOptions
        )
    }
    Inicio(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http.post(`${AUTH_API}/login`, body);
    }

    logout(): Observable<any> {
        return this.http.post(AUTH_API + 'logout', {}, httpOptions);
    }
}
