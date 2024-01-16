import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) {}


  getCatSexoList(): Observable<any> {
    return this.http.get('http://localhost:8000/api/catsexo'); 
  }

  getCatRepresentanteLegalTipoAcreditacion(): Observable<any> {
    return this.http.get('http://localhost:8000/api/catrepresentantelegaltipoAcreditacion');
  }

  getCatRealizaSubcontrataciones(): Observable<any> {
    return this.http.get('http://localhost:8000/api/catrealizasubcontrataciones');
  }


  getCatOrigen(): Observable<any> {
    return this.http.get('http://localhost:8000/api/catorigen');
  }

  
  getCatEntidadFederativa(): Observable<any> {
    return this.http.get('http://localhost:8000/api/catentidadfederativa');
  }

  
  getCatDomicilioVialidad(): Observable<any> {
    return this.http.get('http://localhost:8000/api/catdomiciliovialidad');
  }

  getCatDomicilioTipoAsentamiento(): Observable<any> {
    return this.http.get('http://localhost:8000/api/catdomiciliotipoasentamiento');
  }

  getCatDomicilioEntidadFederativa(): Observable<any> {
    return this.http.get('http://localhost:8000/api/catdomicilioentidadfederativa');
  }

  getCatGiro(): Observable<any> {
    return this.http.get('http://localhost:8000/api/catgiro');
  }
}
