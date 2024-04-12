import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConcursoService } from 'src/app/_services/concurso.service';

@Component({
  selector: 'app-seleccion-proveedor-modificacion',
  template: `
<div style="text-align: center;">

<h2>Modificar Proveedor Ganador</h2>
<p>Concurso: {{ data.nombreDeConcurso}}</p>
  <br>
  <div *ngIf="nombresProveedores && nombresProveedores.length > 0">
    <mat-form-field appearance="fill" style="margin-right: 10px;">
      <mat-label>Seleccionar Proveedor:</mat-label>
      <mat-select [(ngModel)]="selectedProveedorId" name="proveedor">
        <mat-option *ngFor="let proveedor of nombresProveedores" [value]="proveedor.id_proveedor">
          {{ proveedor.proveedor.nombre}} {{ proveedor.proveedor.primerApellido || '' }} {{proveedor.proveedor.segundoApellido || '' }}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <button mat-raised-button style="background-color: green; color: white; margin-left: 10px;" (click)="guardarModificacion()" >Guardar</button>
    <button mat-raised-button style="background-color: rgb(148, 2, 2); color: white; margin-left: 10px;" (click)="cancelarModificacion()">Cancelar</button>
  </div>
  <div *ngIf="!nombresProveedores || nombresProveedores.length === 0">
    <p>No hay proveedores disponibles para seleccionar.</p>
  </div>
</div>
  `,
  styleUrls: ['./seleccion-proveedor-modificacion.component.css'],
})
export class SeleccionProveedorModificacionComponent {
  selectedProveedorId: any = null;
  nombresProveedores: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<SeleccionProveedorModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private concursoService: ConcursoService
  ) {
    this.nombresProveedores = Array.isArray(data?.nombresProveedores) ? data.nombresProveedores : [];
  }
  guardarModificacion(): void {
    if (this.selectedProveedorId === null) {
      console.error('No se ha seleccionado ningún proveedor.');
      return;
    }
    this.dialogRef.close(this.selectedProveedorId);
  }

  cancelarModificacion(): void {
    this.dialogRef.close(null);
  }
}
