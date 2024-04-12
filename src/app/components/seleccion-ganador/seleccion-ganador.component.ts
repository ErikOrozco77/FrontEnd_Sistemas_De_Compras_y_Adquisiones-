import { Component, OnInit } from '@angular/core';
import { ConcursoService } from 'src/app/_services/concurso.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/_services/proveedor.service';
import { SeleccionProveedorDialogComponent } from '../seleccion-proveedor-dialog/seleccion-proveedor-dialog.component';
import { SeleccionProveedorModificacionComponent } from '../seleccion-proveedor-modificacion/seleccion-proveedor-modificacion.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-seleccion-ganador',
  templateUrl: './seleccion-ganador.component.html',
  styleUrls: ['./seleccion-ganador.component.css'],
})
export class SeleccionGanadorComponent implements OnInit {
  concursosActivos: any[] = [];
  proveedoresActivos: any[] = [];
  concursosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  paginaActual: number = 1;
  pageSize: number = 8;
  searchTerm: string = '';
  concursosActivosFiltered: any[] = [];
  displayedColumns: string[] = ['id_concurso', 'nombreDeConcurso', 'proveedorGanador', 'acciones'];
  expandedElement: any | null;

  constructor(
    private concursoService: ConcursoService,
    private router: Router,
    private dialog: MatDialog,
    private proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    this.loadConcursosActivos();
    this.loadProveedoresActivos();
  }

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.concursosActivosFiltered = this.concursosActivos.filter(concurso =>
        concurso.id_concurso.toString().toLowerCase().includes(searchTermLower) ||
        concurso.nombreDeConcurso.toLowerCase().includes(searchTermLower) ||
        concurso.nombreDeConcurso.includes(this.searchTerm.trim())
      );
    } else {
      this.concursosActivosFiltered = this.concursosActivos;
    }
  }


  loadConcursosActivos(): void {
    this.concursoService.getConcursosActivos().subscribe(
      (concursos) => {
        this.concursosActivos = concursos;
        this.concursosActivosFiltered = concursos;
        this.sortConcursos(); 
        this.concursosSubject.next(concursos);
      },
      (error) => {
        console.error('Error al obtener concursos activos', error);
      }
    );
  }
  loadProveedoresActivos(): void {
    this.proveedorService.getAllProveedores().subscribe(
      (response) => {
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          this.proveedoresActivos = response.data;
        } else {
          console.error('La propiedad data de la respuesta no contiene un array válido o está vacía.');
        }
      },
      (error) => {
        console.error('Error al obtener proveedores activos', error);
      }
    );
  }

  navigateToAdminMode() {
    this.router.navigate(['/admin-mode']);
  }

  seleccionarProveedorGanador(idConcurso: number): void {
    this.concursoService.getProveedoresConcursantes(idConcurso).subscribe(
      (proveedores: any[]) => {
        const dialogRef = this.dialog.open(SeleccionProveedorDialogComponent, {
          width: '500px',
          data: { nombresProveedores: proveedores },
        });
  
        dialogRef.afterClosed().subscribe((nombreProveedorGanador) => {
          if (nombreProveedorGanador) {
            const proveedorSeleccionado = proveedores.find((proveedor: any) => proveedor.id_proveedor === nombreProveedorGanador);

            if (proveedorSeleccionado) {
              const idProveedorSeleccionado = Number(nombreProveedorGanador);
              this.concursoService.registrarGanador(idConcurso, idProveedorSeleccionado).subscribe(
                (respuesta) => {
                  alert('Proveedor ganador registrado con éxito');
                  this.loadConcursosActivos();
                },
                (error) => {
                  alert('Error al registrar al proveedor ganador');
                }
              );
            } else {
              alert('No se encontró el proveedor con el nombre seleccionado.');
            }
          } else {
            
          }
        });
      },
      (error) => {
        alert('Error al obtener los proveedores concursantes');
      }
    );
  }
  

  modificarGanador(idConcurso: number): void {
    const concurso = this.concursosActivos.find(concurso => concurso.id === idConcurso);
    const ganadorActual = concurso.proveedorGanador;

    this.concursoService.getProveedoresConcursantes(idConcurso).subscribe(
        (proveedores: any[]) => {
            const dialogRef = this.dialog.open(SeleccionProveedorModificacionComponent, {
                width: '500px',
                data: { id_concurso: idConcurso, nombreDeConcurso: concurso.nombreDeConcurso, nombresProveedores: proveedores, ganadorActual: ganadorActual },
            });

            dialogRef.afterClosed().subscribe((proveedorSeleccionadoId) => {
                if (proveedorSeleccionadoId !== undefined && proveedorSeleccionadoId !== null) {
                    this.concursoService.modificarGanador(idConcurso, proveedorSeleccionadoId).subscribe(
                        (respuesta) => {
                            if (respuesta.message === 'Proveedor ganador modificado con éxito') {
                                alert('Proveedor ganador modificado con éxito.');
                                this.loadConcursosActivos();
                            } else {
                                alert('Error al modificar al proveedor ganador: ' + respuesta.error);
                            }
                        },
                        (error) => {
                            alert('Error al modificar al proveedor ganador: ' + error);
                        }
                    );
                }
            });
        },
        (error) => {
            alert('Error al obtener los proveedores concursantes');
        }
    );
}


sortConcursos(): void {
  // Ordenar los concursos para que los que no tienen ganador estén primero
  this.concursosActivosFiltered.sort((a, b) => {
    if (!a.proveedorGanador && b.proveedorGanador) {
      return -1;
    } else if (a.proveedorGanador && !b.proveedorGanador) {
      return 1;
    } else {
      return 0;
    }
  });
}


}
