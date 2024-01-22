import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private baseUrl = 'http://localhost:8000/api/';

  public isUserRegisteredSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) { }
  
  registrarProveedor(proveedorData:FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}registerProveedor`, proveedorData)
      .pipe(
        tap(() => {
          this.isUserRegisteredSubject.next(true);
        })
      );
  }

  updateProveedor(userId: number,data: any): Observable<any> {
    const url = `${this.baseUrl}updateProveedor?user_id=${userId}`;
    return this.http.put(url, data);
  }

  getProveedorByUserId(userId: number) {
    const url =`${this.baseUrl}getProveedorByUserId/${userId}`;
    return this.http.get(url);
  }

  verificarExistenciaProveedor(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}redireccion/${userId}`);
  }


  

  isUserRegistered() {
    return this.isUserRegisteredSubject.value;
  }

  setUserRegisteredStatus(status: boolean) {
    this.isUserRegisteredSubject.next(status);
  }

  uploadFiles(fileData: FormData): Observable<any> {
    const url = `${this.baseUrl}upload-files`;
    return this.http.post(url, fileData);
  }
  
  downloadFiles(userId: number): Observable<HttpResponse<Blob>> {
    const url = `${this.baseUrl}/download-files/${userId}`;
    
    const headers = new HttpHeaders().set('Accept', 'application/pdf');

    return this.http.get<Blob>(url, { responseType: 'blob' as 'json', headers: headers, observe: 'response' });
  }

  downloadINE(userId: string): Observable<HttpResponse<Blob>> {
    const url = `${this.baseUrl}get-ine/${userId}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  downloadConstancia(userId: string): Observable<HttpResponse<Blob>> {
    const url = `${this.baseUrl}get-constancia/${userId}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  getAllProveedores(): Observable<any> {
    return this.http.get(`${this.baseUrl}admin-mode`);
  }

    // Eliminar archivo INE
    deleteINE(userId: string): Observable<{ message: string }> {
      return this.http.delete<{ message: string }>(`${this.baseUrl}eliminar-ine/${userId}`);
    }
  
    // Eliminar archivo Constancia
    deleteConstancia(userId: string): Observable<{ message: string }> {
      return this.http.delete<{ message: string }>(`${this.baseUrl}eliminar-constancia/${userId}`);
    }
  
    getINEInfo(userId: number): Observable<any> {
      const url = `${this.baseUrl}download-ine/${userId}`;
      return this.http.get(url, { responseType: 'blob' });
    }
  
    getConstanciaInfo(userId: number): Observable<any> {
      const url = `${this.baseUrl}download-constancia/${userId}`;
      return this.http.get(url, { responseType: 'blob' });
    }


    replaceINE(userId: number, ineFile: File): Observable<any> {
      const formData = new FormData();
      formData.append('user_id', userId.toString());
      formData.append('ine', ineFile);
    
      return this.http.post(`${this.baseUrl}replace-ine/${userId}`, formData);
    }
    
    replaceConstancia(userId: number, constanciaFile: File): Observable<any> {
      const formData = new FormData();
      formData.append('user_id', userId.toString());
      formData.append('constancia', constanciaFile);
    
      return this.http.post(`${this.baseUrl}replace-constancia/${userId}`, formData);
    }

    detectarArchivosAlmacenados(userId: number): Observable<any> {
      const url = `${this.baseUrl}detectar-archivos-almacenados/${userId}`;
      return this.http.get<any>(url); // Añade <any> aquí
    }
    
  }

