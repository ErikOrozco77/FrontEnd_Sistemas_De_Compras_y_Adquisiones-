import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConcursoService } from 'src/app/_services/concurso.service';
import { CustomDateAdapter, MY_DATE_FORMATS } from 'src/app/_services/custom-date-adapter.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-update-concurso-component',
  templateUrl: './update-concurso-component.component.html',
  styleUrls: ['./update-concurso-component.component.css'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class UpdateConcursoComponentComponent implements OnInit {
  updateConcursoForm: FormGroup;
  concurso: any; 
  @Output() concursoActualizado: EventEmitter<any> = new EventEmitter<any>();
  fechaEntregaDocumentos
  fechaExpedicion
  fechaEntregaDocumentosFinal:any
  fechaExpedicionFinal:any

  constructor(
    public dialogRef: MatDialogRef<UpdateConcursoComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private concursoService: ConcursoService,
    private router: Router
  ) {
    this.fechaEntregaDocumentos = moment(data.fechaEntregadeDocumentos).add(1, 'days').format('YYYY-MM-DD');
    this.fechaExpedicion = moment(data.fechaExpedicion).add(1, 'days').format('YYYY-MM-DD');

    this.fechaEntregaDocumentosFinal = moment(data.fechaEntregadeDocumentos).format('YYYY-MM-DD');
    this.fechaExpedicionFinal = moment(data.fechaExpedicion).format('YYYY-MM-DD');
    /* const fechaExpedicion = moment(data.fechaExpedicion).format('YYYY-MM-DD'); */


    // Inicializar el formulario con las fechas formateadas
    this.updateConcursoForm = this.formBuilder.group({
      id_concurso: [data.id_concurso, Validators.required],
      nombreDeConcurso: [data.nombreDeConcurso, Validators.required],
      fechaEntregadeDocumentos: [this.fechaEntregaDocumentos, Validators.required],
      fechaExpedicion: [this.fechaExpedicion, Validators.required],
    });

  }

  ngOnInit(): void {
    this.concursoService.getConcursoPorId(this.data.id).subscribe(
      (concurso) => {
        this.concurso = concurso;
      },
      (error) => {
        console.error('Error al obtener el concurso por ID', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateConcurso() {

    if (this.concurso) {
      const idConcurso = this.concurso.id;
      if (this.updateConcursoForm.value.fechaExpedicion == this.fechaExpedicion) {
        const updatedConcurso = {
          id_concurso: this.updateConcursoForm.value.id_concurso,
          nombreDeConcurso: this.updateConcursoForm.value.nombreDeConcurso,
          fechaEntregadeDocumentos: moment(this.fechaEntregaDocumentosFinal).format('YYYY-MM-DD'),
          fechaExpedicion: moment(this.fechaExpedicionFinal).format('YYYY-MM-DD'),
          
        };
        
        this.concursoService.actualizarConcurso(idConcurso, updatedConcurso).subscribe(
          response => {
            this.concursoActualizado.emit(); 
            alert('Concurso actualizado con éxito');
            this.dialogRef.close();
       
          },
          error => {
            alert('Error al actualizar el concurso');
          }
        );
      } else {
        const updatedConcurso = {
          id_concurso: this.updateConcursoForm.value.id_concurso,
          nombreDeConcurso: this.updateConcursoForm.value.nombreDeConcurso,
          fechaEntregadeDocumentos: moment(this.updateConcursoForm.value.fechaEntregadeDocumentos).format('YYYY-MM-DD'),
          fechaExpedicion: moment(this.updateConcursoForm.value.fechaExpedicion).format('YYYY-MM-DD'),
        };
        this.concursoService.actualizarConcurso(idConcurso, updatedConcurso).subscribe(
          response => {
            this.concursoActualizado.emit(); 
            alert('Concurso actualizado con éxito');
            this.dialogRef.close();
       
          },
          error => {
            alert('Error al actualizar el concurso');
          }
        );
      }
      
      
    } else {
      console.error('Información del concurso no disponible');
    }
  }
}
