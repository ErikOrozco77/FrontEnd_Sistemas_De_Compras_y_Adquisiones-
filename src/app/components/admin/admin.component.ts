import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedorService } from '../../_services/proveedor.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ProveedorModalService } from '../../_services/ProveedorModal.service'; 
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  proveedores: any[] = [];
  showSearch = false;
  displayedColumns: string[] = ['id', 'nombre', 'primerApellido', 'catGiro', 'razonSocial', 'rfc', 'telefono', 'INE', 'Constancia'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;


  constructor(
    private proveedorService: ProveedorService,
    private authService: AuthService,
    private router: Router,
    private proveedorModalService: ProveedorModalService,
    private http: HttpClient
  ) {
    this.dataSource = new MatTableDataSource<any>();
    this.paginator = {} as MatPaginator;
  }
  

  ngOnInit(): void {
    this.proveedorService.getAllProveedores().subscribe(
      (proveedoresData) => {
        this.proveedores = proveedoresData.data;
        this.dataSource.data = this.proveedores;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener proveedores', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (this.dataSource) {
      this.dataSource.filter = filterValue;
      
    }
  }

  onRowClicked(row: any): void {
    console.log('Row clicked:', row);
    this.proveedorModalService.openProveedorModal(row);
  }

  
  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
      window.history.pushState(null, '', '/login');
      window.sessionStorage.clear();
    });
  }

  descargarINE(event: Event, userId: number): void {
    // Detener la propagación del evento
    event.stopPropagation();
  
    // Lógica para descargar el INE
    this.proveedorService.downloadINE(userId.toString()).subscribe(
      (response: HttpResponse<Blob>) => {
        const data: Blob = response.body as Blob;
        this.descargarArchivo(data, `INE_${userId}.pdf`);
      },
      (error) => {
        alert('Error al descargar INE');
      }
    );
  }
  
  descargarConstancia(event: Event, userId: number): void {
    // Detener la propagación del evento
    event.stopPropagation();
  
    // Lógica para descargar la Constancia
    this.proveedorService.downloadConstancia(userId.toString()).subscribe(
      (response: HttpResponse<Blob>) => {
        const data: Blob = response.body as Blob;
        this.descargarArchivo(data, `Constancia_${userId}.pdf`);
      },
      (error) => {
        alert('Error al descargar Constancia');
      }
    );
  }
  
  private descargarArchivo(data: Blob, nombreArchivo: string): void {
    const blobUrl = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = nombreArchivo;
    link.click();
  }

}

export class SidenavOverviewExample {
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}

