import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConcursoService } from 'src/app/_services/concurso.service';

@Component({
  selector: 'app-seleccion-proveedor-dialog',
  template: `
    <br>
    <h2 style="text-align: center;">Proveedor Ganador</h2> 
    <div *ngIf="nombresProveedores.length > 0; else noProveedores" style="text-align: center; margin-top: 10px;">
      <p style="text-align: center;">Concurso: {{ nombresProveedores[0]?.concurso.nombreDeConcurso }} </p>
      <mat-form-field appearance="fill" style="margin-right: 10px;">
        <mat-label style="font-size: 13px;">Seleccionar Proveedor:</mat-label>
        <mat-select [(ngModel)]="selectedProveedorNombre" name="proveedor">
          <mat-option *ngFor="let proveedor of nombresProveedores" [value]="proveedor.id_proveedor">
            {{ proveedor.proveedor.nombre }} {{ proveedor.proveedor.primerApellido }} {{ proveedor.proveedor.segundoApellido }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button style="background-color: rgb(148, 2, 2); color: white; margin-left: 10px;" [mat-dialog-close]="selectedProveedorNombre">Aceptar</button>
    </div>
    <ng-template #noProveedores>
      <div style="text-align: center;">
        <p>No hay proveedores disponibles en este concurso.</p>
      </div>
    </ng-template>
  `,
  styleUrls: ['./seleccion-proveedor-dialog.component.css'],
})
export class SeleccionProveedorDialogComponent {
  selectedProveedorNombre: string = '';
  nombresProveedores: any[] = [];
  ganadorActual: any;

  constructor(
    public dialogRef: MatDialogRef<SeleccionProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private concursoService: ConcursoService
  ) {
    this.nombresProveedores = data?.nombresProveedores || [];
    this.ganadorActual = data?.ganadorActual;
  }
}
