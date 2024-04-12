import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConcursoService } from 'src/app/_services/concurso.service';
import { ProveedorService } from '../../_services/proveedor.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verificar-invitaciones',
  templateUrl: './verificar-invitaciones.component.html',
  styleUrls: ['./verificar-invitaciones.component.css']
})
export class VerificarInvitacionesComponent implements OnInit {
  concursos: any[] = [];
  idProveedor!: number;
  idUser!: number;

  constructor(
    private route: ActivatedRoute,
    private concursoService: ConcursoService,
    private proveedorService: ProveedorService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.idUser = this.getUserIdFromSession();
    this.obtenerIdProveedor();
  }

  getUserIdFromSession(): number {
    const authUser = window.sessionStorage.getItem('auth-user');
    if (authUser) {
      const authUserData = JSON.parse(authUser);
      return authUserData.data.id;
    } else {
      console.error('No se ha encontrado ningún usuario autenticado en la sesión');
      return 0;
    }
  }

  obtenerIdProveedor(): void {
    this.proveedorService.getProveedorByUserId(this.idUser).subscribe(
      (proveedor: any) => {
        this.idProveedor = proveedor.id;
        this.obtenerConcursosProveedor();
      },
      (error) => {
        console.error('Error al obtener el proveedor del usuario', error);
      }
    );
  }

  obtenerConcursosProveedor(): void {
    this.concursoService.obtenerConcursosDelProveedor(this.idProveedor).subscribe(
      (response: any) => {
        this.concursos = response.concursos
          .filter((concurso: any) => {
            return !concurso.ganador_id;
          })
          .sort((a: { fechaEntregadeDocumentos: string | number | Date; }, b: { fechaEntregadeDocumentos: string | number | Date; }) => new Date(b.fechaEntregadeDocumentos).getTime() - new Date(a.fechaEntregadeDocumentos).getTime());
      },
      (error) => {
        console.error('Error al obtener los concursos del proveedor', error);
      }
    );
  }

  descargarInvitacion(idConcurso: number): void {
    this.concursoService.descargarInvitacion(idConcurso, this.idProveedor).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = `invitacion_${idConcurso}.pdf`;
        a.click();

        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar la invitación del concurso', error);
      }
    );
  }
}
