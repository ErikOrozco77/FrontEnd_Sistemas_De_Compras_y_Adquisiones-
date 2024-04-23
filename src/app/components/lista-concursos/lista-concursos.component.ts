import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { ConcursoService } from 'src/app/_services/concurso.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateConcursoComponentComponent } from '../update-concurso-component/update-concurso-component.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomDateAdapter, MY_DATE_FORMATS } from 'src/app/_services/custom-date-adapter.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-lista-concursos',
  templateUrl: './lista-concursos.component.html',
  styleUrls: ['./lista-concursos.component.css'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ]
})
export class ListaConcursosComponent implements OnInit {
  concursosActivos: any[] | undefined;
  searchTerm: string = '';
  concursosOriginales: any[] | undefined;
  selectedDate: Date | null = null;
  concursosFiltrados: any[] | undefined;
  searchingByDate: boolean = false;
  dataSource!: MatTableDataSource<any>;

  constructor(private concursoService: ConcursoService, private router: Router, private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.concursoService.getConcursosActivos().subscribe(
      (concursos) => {
        this.concursosActivos = concursos;
        this.concursosOriginales = [...concursos];
        this.dataSource = new MatTableDataSource(concursos); 
      },
      (error) => {
        console.error('Error al obtener concursos activos', error);
      }
    );
  }

  navigateToAdminMode() {
    console.log("Navigating to Admin Mode");
    this.router.navigate(['/admin-mode']);
  }

  openUpdateConcursoDialog(concurso: any): void {
    // Imprimir las fechas antes de abrir el diálogo
    const dialogRef = this.dialog.open(UpdateConcursoComponentComponent, {
      width: '400px',
      data: concurso,
    });
  
    dialogRef.componentInstance.concursoActualizado.subscribe(() => {
      this.actualizarDatosDeLaTabla(); 
    });
  }
  

  formatDateToString(date: Date): string {
  return formatDate(date, 'dd/MM/yyyy', 'en-US');
}

  borrarConcurso(concursoId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: '¿Está seguro de  borrar el concurso?' }
    });
  
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.concursoService.desactivarConcurso(concursoId, true).subscribe(
          (response) => {
            console.log('Concurso desactivado con éxito', response);
            this.actualizarDatosDeLaTabla(); 
          },
          (error) => {
            console.error('Error al desactivar el concurso', error);
          }
        );
      }
    });
  }
  
  actualizarDatosDeLaTabla(): void {
    this.concursoService.getConcursosActivos().subscribe(
      (concursos) => {
        this.concursosOriginales = concursos;
        this.concursosActivos = concursos;
        this.dataSource.data = concursos;
        this.filtrarConcursos(); 
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al obtener concursos activos después de la edición', error);
      }
    );
  }

  
  buscarConcursosPorFecha(): void {
    if (this.selectedDate) {
      const fechaExpedicionString = this.formatDate(this.selectedDate);
      this.concursoService.buscarConcursosPorFecha(fechaExpedicionString).subscribe(
        (concursos) => {
          this.concursosActivos = concursos;
          this.searchingByDate = true;
        },
        (error) => {
          this.searchingByDate = true;
          alert('No se encontraron concursos.');
        }
      );
    } else {
      alert('Selecciona una fecha valida.');
    }
  }
  
  filtrarConcursos(): void {
    if (this.concursosOriginales) {
      let concursosFiltrados = [...this.concursosOriginales];
  
      if (this.searchTerm) {
        const searchTermLower = this.searchTerm.toLowerCase();
        concursosFiltrados = concursosFiltrados.filter(concurso =>
          concurso.nombreDeConcurso.toLowerCase().includes(searchTermLower) ||
          concurso.id_concurso.toString().toLowerCase().includes(searchTermLower)
        );
      }
  
      if (this.selectedDate) {
        const fechaExpedicionString = this.formatDate(this.selectedDate);
        concursosFiltrados = concursosFiltrados.filter(concurso =>
          concurso.fechaExpedicion === fechaExpedicionString ||
          concurso.fechaEntregadeDocumentos === fechaExpedicionString
        );
      }
  
      this.concursosActivos = concursosFiltrados;
  
      setTimeout(() => {
        this.dataSource.data = concursosFiltrados;
      }, 100);
    }
  }
  
  clearSelectedDate() {
    this.selectedDate = null;
    this.searchingByDate = false;
    this.actualizarDatosDeLaTabla();
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  limpiarBusquedaYPaginador(): void {
    this.searchTerm = ''; 
    this.selectedDate = null; 
    this.filtrarConcursos();
  }
}