import { Component, OnInit, ViewChild } from '@angular/core';
import { ConcursoService } from 'src/app/_services/concurso.service';
import { ProveedorService } from 'src/app/_services/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  showSearch = false;
  displayedColumns: string[] = ['nombre', 'primerApellido', 'catGiro', 'representanteLegalMail'];
  concursos: any[] = [];
  proveedoresSeleccionados: any[] = [];
  proveedorSeleccionado: any;
  selectedRowIndex: number = -1;
  dataSource: MatTableDataSource<any>;
  id_concurso: string = '';
  enviandoCorreo: boolean = false;
  nombreConcurso: string = '';
  highlightedRowIndex: number = -1;
  
  constructor(
    private proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private concursoService: ConcursoService
  ) {
    this.dataSource = new MatTableDataSource<any>();

  }

  ngOnInit(): void {
    this.id_concurso = this.route.snapshot.params['id_concurso'];
    this.proveedorService.getAllProveedores().subscribe(
      (proveedoresData) => {
        this.proveedores = proveedoresData.data;
        this.dataSource.data = this.proveedores;
      },
      (error) => {
        console.error('Error al obtener proveedores', error);
      }
    );
  
    this.getNombreConcurso(this.id_concurso);
  }




  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (this.dataSource) {
      this.dataSource.filter = filterValue;
    }
  }

  onRowClicked(row: any): void {
    const index = this.proveedoresSeleccionados.findIndex((p) => p.id === row.id);

    if (index === -1) {
      this.proveedoresSeleccionados.push(row);
      this.dataSource.data = this.proveedores.filter(p => !this.proveedoresSeleccionados.map(p => p.id).includes(p.id));
    } else {
      this.proveedoresSeleccionados.splice(index, 1);
      this.dataSource.data = this.proveedores.filter(p => !this.proveedoresSeleccionados.map(p => p.id).includes(p.id));
    }
  }

  enviarProveedoresSeleccionados(): void {
    this.enviandoCorreo = true;
    const proveedoresIds = this.proveedoresSeleccionados.map((proveedor) => proveedor.id);

    this.concursoService.seleccionarProveedores(this.id_concurso, proveedoresIds)
      .subscribe(
        (response) => {
          this.enviandoCorreo = false;
          alert('Proveedores Invitados Correctamente');
          this.router.navigate(['/menu-concurso']);
        },
        (error) => {
          this.enviandoCorreo = false;
          alert('Error al seleccionar proveedores para el concurso');
        }
      );
  }

  isHovered(proveedor: any): boolean {
    return proveedor === this.proveedorSeleccionado;
  }

  onMouseEnter(proveedor: any): void {
    this.proveedorSeleccionado = proveedor;
  }

  onMouseLeave(): void {
    this.proveedorSeleccionado = null;
  }

  eliminarProveedorSeleccionado(proveedor: any): void {
    const index = this.proveedoresSeleccionados.findIndex((p) => p.id === proveedor.id);

    if (index !== -1) {
      this.proveedoresSeleccionados.splice(index, 1);
      this.dataSource.data = this.proveedores.filter(p => !this.proveedoresSeleccionados.map(p => p.id).includes(p.id));
    }
  }
  navigateToMenu() {
    this.router.navigate(['/menu-concurso']);
  }


  onMouseEnterRow(index: number): void {
    this.highlightedRowIndex = index;
  }

  onMouseLeaveRow(index: number): void {
    this.highlightedRowIndex = -1;
  }

  getNombreConcurso(idConcurso: any): void {
    this.concursoService.getConcursoPorId(idConcurso).subscribe(
      (concurso) => {
        this.nombreConcurso = concurso.nombreDeConcurso;
        this
      },
      (error) => {
        console.error('Error al obtener el nombre del concurso', error);
      }
    );
  }
  

}