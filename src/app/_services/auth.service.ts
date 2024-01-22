import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


const AUTH_API = 'http://localhost:8000/api/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: any = null;
    userId: number | null = null;

    isLoggedIn(): boolean {
        return !!this.user; 
    }
    constructor(private http: HttpClient) { }


    login(username: string, correo: string, rfc:string): Observable<any> {
        return this.http.post(AUTH_API + 'register', { username, correo,rfc}, httpOptions
        )
    }

    Inicio(email: string, password: string): Observable<any> {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        return this.http.post(AUTH_API + 'login', { email, password }, httpOptions
        )
    }

    isAuthenticated(): Observable<any> {
        return this.http.get(AUTH_API + 'user');
    }

    refreshToken(): Observable<any> {
        return this.http.post(AUTH_API + 'refresh', {});
    }

    logout(): Observable<any> {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        return this.http.post(AUTH_API + 'logout', {}, httpOptions).pipe(
            tap(() => {
                this.user = null;
            })
        );
    }


    confirmarContraseña(password: string, token: string): Observable<any> {
        return this.http.post(AUTH_API + 'confirmacion', { password, token }, httpOptions);
    }
    getUser(): any {
        return this.user;
    }

    getUserDetails(): Observable<any> {
        return this.http.get(AUTH_API + 'user-details'); 
    }


}
