import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class ConcursoService {
    private baseUrl = 'http://localhost:8000/api/';

    constructor(private http: HttpClient) { }

    registrarConcurso(concursoData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}registrarConcurso`, concursoData);
    }

    seleccionarProveedores(idConcurso: string, proveedoresSeleccionados: number[]): Observable<any> {
        const body = { id_concurso: idConcurso, proveedoresSeleccionados: proveedoresSeleccionados };

        return this.http.post<any>(`${this.baseUrl}seleccionDeProveedores`, body);
    }

    getConcursosActivos(): Observable<any[]> {
        const url = `${this.baseUrl}ListaDeConcurso`;
        return this.http.get<any[]>(url).pipe(
            catchError(error => {
                console.error('Error al obtener la lista de concursos', error);
                return throwError(error);
            })
        );
    }

    actualizarConcurso(id: number, datosActualizados: any): Observable<any> {
        const url = `${this.baseUrl}updateConcurso/${id}`;
        return this.http.put(url, datosActualizados);
    }
    
    getConcursoPorId(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}concurso/${id}`);
    }

    desactivarConcurso(concursoId: number, confirmado: boolean): Observable<any> {
        if (!confirmado) {
            return new Observable();
        }

        const url = `${this.baseUrl}desactivar/${concursoId}`;
        return this.http.put(url, {});
    }


    registrarGanador(idConcurso: number, idProveedor: number): Observable<any> {
        const body = { id_concurso: idConcurso, proveedor_id: idProveedor };
        return this.http.post(`${this.baseUrl}registrarGanador`, body);
    }

    modificarGanador(idConcurso: number, proveedorId: number): Observable<any> {
        const url = `${this.baseUrl}concursos/${idConcurso}/ganador`;
        return this.http.put(url, { proveedorId });
    }
    getProveedoresConcursantes(idConcurso: number): Observable<any> {
        return this.http.get(`${this.baseUrl}concursos/${idConcurso}/proveedores`);
    }


    buscarConcursos(terminoBusqueda: string): Observable<any[]> {
        const url = `${this.baseUrl}concursos/buscar?termino=${terminoBusqueda}`;
        return this.http.get<any[]>(url).pipe(
            catchError(error => {
                console.error('Error al buscar concursos', error);
                return throwError(error);
            })
        );
    }


    buscarConcursosPorFecha(fechaExpedicion: string) {
        const fechaExpedicionWithSpace = `${fechaExpedicion} `;
        const url = `${this.baseUrl}buscar-por-fecha?`;
        return this.http.get<any[]>(url, {
            params: { fechaExpedicion: fechaExpedicionWithSpace }
        });
    }

    descargarInvitacion(idConcurso: number, idProveedor: number): Observable<Blob> {
        return this.http.get(`${this.baseUrl}invitaciones/${idConcurso}/${idProveedor}`, { responseType: 'blob' });
        console.log(idConcurso + idProveedor)
      }


    obtenerConcursosDelProveedor(idProveedor: number) {
        return this.http.get(`${this.baseUrl}concursos-proveedor/${idProveedor}`);
    }
}

