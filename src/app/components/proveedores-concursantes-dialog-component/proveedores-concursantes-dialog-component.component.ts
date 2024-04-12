import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedores-concursantes-dialog-component',
  templateUrl: './proveedores-concursantes-dialog-component.component.html',
  styleUrls: ['./proveedores-concursantes-dialog-component.component.css']
})
export class ProveedoresConcursantesDialogComponentComponent {
  concurso: any;
  proveedoresConcursantes: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.concurso = this.data.concurso;
    this.proveedoresConcursantes = this.data.proveedoresConcursantes;
  }
}


