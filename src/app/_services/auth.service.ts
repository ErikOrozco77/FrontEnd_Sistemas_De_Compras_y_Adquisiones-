import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';


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
    constructor(private http: HttpClient, private storageService: StorageService,) { }


    isLoggedIn(): boolean {
        if (this.storageService.isLoggedIn()) {
            this.user = true;
        } else {
            this.user = false;
        }

        return this.user;
    }

    login(username: string, correo: string, rfc: string, recaptchaToken: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        // Añade el recaptchaToken al cuerpo de la solicitud
        const body = {
            username,
            correo,
            rfc,
            recaptchaToken
        };

        return this.http.post(AUTH_API + 'register', body, httpOptions).pipe(
            tap((response: any) => {
                localStorage.setItem('userData', JSON.stringify(response.user));
            })
        );
    }


    Inicio(email: string, password: string, recaptchaToken: string): Observable<any> {
        console.log('Inicio:', email, password, recaptchaToken);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const body = {
            email: email,
            password: password,
            recaptchaToken: recaptchaToken 
        };
        return this.http.post<any>(`${AUTH_API}login`, body, httpOptions).pipe(
            catchError((error) => {
                if (error.error && error.error.resetCaptcha) {
                    return throwError({ resetCaptcha: true });
                }
                return throwError(error);
            })
        );
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
        if (this.storageService.isLoggedIn()) {
            this.user = true;
        } else {
            this.user = false;
        }
        return this.user;
    }

    getUserDetails(): Observable<any> {
        return this.http.get(AUTH_API + 'user-details');
    }


}





