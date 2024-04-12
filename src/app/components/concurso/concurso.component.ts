import { Component } from '@angular/core';
import { ConcursoService } from 'src/app/_services/concurso.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';
import { CustomDateAdapter, MY_DATE_FORMATS } from 'src/app/_services/custom-date-adapter.service';
import { Router } from '@angular/router';
import * as moment from 'moment'; 

@Component({
  selector: 'app-concurso',
  templateUrl: './concurso.component.html',
  styleUrls: ['./concurso.component.css'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class ConcursoComponent {
  id: number = 0;
  id_concurso:string = '';
  nombreDeConcurso: string = '';
  fechaEntregadeDocumentos: Date | null = null;
  fechaExpedicion: Date | null = null;
  proveedorGanador: string = '';

  constructor(
    private concursoService: ConcursoService,
    private dateAdapter: DateAdapter<any>,
    private router: Router
  ) {
    this.dateAdapter.setLocale('es'); 
    this.fechaEntregadeDocumentos = null;
    this.fechaExpedicion = null;
  }

  registrarConcurso(): void {
    if (!this.id_concurso || !this.nombreDeConcurso || !this.fechaEntregadeDocumentos || !this.fechaExpedicion) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
  }
  const fechaEntregadeDocumentosFormatted = moment(this.fechaEntregadeDocumentos).format('YYYY-MM-DD');
  const fechaExpedicionFormatted = moment(this.fechaExpedicion).format('YYYY-MM-DD');
    const concursoData = {
      id: this.id,
      id_concurso: this.id_concurso,
      nombreDeConcurso: this.nombreDeConcurso,
      fechaEntregadeDocumentos: fechaEntregadeDocumentosFormatted,
      fechaExpedicion: fechaExpedicionFormatted,
      proveedorGanador: this.proveedorGanador,
    };

    this.concursoService.registrarConcurso(concursoData).subscribe(
      (response) => {
        alert('Concurso registrado con éxito');
        const id_concurso = response.id_concurso;
        this.router.navigate(['/admin-mode'])
      },
      (error) => {
        alert('Error al registrar el concurso');
      }
    );
  }

  navigateToAdminMode() {
    this.router.navigate(['/admin-mode']);
  }
  
}
