import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorDetalleComponent } from '../components/proveedor-detalle/proveedor-detalle.component';


@Injectable({
  providedIn: 'root',
})
export class ProveedorModalService {
  constructor(public dialog: MatDialog) {}

  openProveedorModal(proveedor: any): void {
    const dialogRef = this.dialog.open(ProveedorDetalleComponent, {
      width: '600px', // ajusta el ancho según tus necesidades
      data: proveedor,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('La ventana emergente se cerró');
    });
  }
}