import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:8000/api/';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
    providedIn: 'root',
})
export class FileService {
    dataSearch$ = new EventEmitter<any>();
    constructor(private http: HttpClient) {}

    search(cuie: string): Observable<any> {
        return this.http.get(AUTH_API + 'logs/getlog/' + cuie);
    }
}
