import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConcursoService } from 'src/app/_services/concurso.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProveedoresConcursantesDialogComponentComponent } from '../proveedores-concursantes-dialog-component/proveedores-concursantes-dialog-component.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomDateAdapter, MY_DATE_FORMATS } from 'src/app/_services/custom-date-adapter.service';
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página'; 
  
}
@Component({
  selector: 'app-menu-proveedores-concursantes',
  templateUrl: './menu-proveedores-concursantes.component.html',
  styleUrls: ['./menu-proveedores-concursantes.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})

export class MenuProveedoresConcursantesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  concursosActivos: any[] = [];
  concursosFiltrados: any[] = []; 
  searchTerm: string = '';
  proveedoresConcursantes: any[] = [];
  datosCargados: boolean = false;
  showNoResultsMessage: boolean = false;
  selectedDate: Date | null = null;
  dataSource!: MatTableDataSource<any>;
  totalConcursos: number = 0;
  searchingByDate: boolean = false;
  selectedRowIndex: number = -1;
  highlightedRowIndex: number = -1;
  constructor(
    private concursoService: ConcursoService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.obtenerConcursos();
  }

  obtenerConcursos(): void {
    this.concursoService.getConcursosActivos().subscribe(
      (concursos) => {
        if (concursos && concursos.length > 0) {
          this.concursosActivos = concursos;
          this.totalConcursos = concursos.length;
          this.filtrarConcursos(); 
        } else {
          console.error('No concursos activos encontrados');
        }
      },
      (error) => {
        console.error('Error al obtener concursos activos', error);
      }
    );
  }


  buscarConcursosPorFecha(): void {
    if (this.selectedDate) {
      const fechaExpedicionString = this.formatDate(this.selectedDate);
      this.concursoService.buscarConcursosPorFecha(fechaExpedicionString).subscribe(
        (concursos) => {
          this.concursosFiltrados = concursos;
          this.dataSource = new MatTableDataSource(this.concursosFiltrados);
   
          this.searchingByDate = true;

        },
        (error) => {
          this.searchingByDate = true;
          alert('No se encontraron concursos.');
        }
      );
    } else {
      alert('La fecha de expedición seleccionada es nula.');
    }
  }
  
  clearSelectedDate() {
    this.selectedDate = null;
    this.searchingByDate = false; 
    this.buscarConcursosPorFecha();
    this.paginator.firstPage();

  }
  

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

 

  openProveedoresConcursantesDialog(concurso: any): void {
    this.obtenerProveedoresConcursantes(concurso.id).subscribe(
      (proveedores: any[]) => {
        const dialogRef = this.dialog.open(ProveedoresConcursantesDialogComponentComponent, {
          width: '900px',
          data: { concurso: concurso, proveedoresConcursantes: proveedores }
        });
      },
      (error: any) => {
        console.error('Error al obtener proveedores concursantes', error);
      }
    );
  }

  obtenerProveedoresConcursantes(idConcurso: number): Observable<any[]> {
    return this.concursoService.getProveedoresConcursantes(idConcurso);
  }

  levenshteinDistance(a: string, b: string): number {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  filtrarConcursos(): void {
    if (this.searchTerm || this.selectedDate) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.concursosFiltrados = this.concursosActivos.filter(concurso =>
        concurso.nombreDeConcurso.toLowerCase().includes(searchTermLower) ||
        concurso.id_concurso.toString().toLowerCase().includes(searchTermLower)
      );
    } else {
      this.concursosFiltrados = [...this.concursosActivos];
    }
    this.totalConcursos = this.concursosFiltrados.length;
    this.dataSource = new MatTableDataSource(this.concursosFiltrados);
    this.showNoResultsMessage = this.concursosFiltrados.length === 0 && !!this.searchTerm;
  }



  navigateToAdminMode() {
    this.router.navigate(['/admin-mode']);
  }

  limpiarBusquedaYPaginador(): void {
    this.searchTerm = '';
    this.selectedDate = null; 
    this.filtrarConcursos();
  }

  onRowClicked(index: number): void {
    this.selectedRowIndex = index;
  }

  onMouseEnterRow(index: number): void {
    this.highlightedRowIndex = index;
  }

  onMouseLeaveRow(index: number): void {
    this.highlightedRowIndex = -1;
  }

}


