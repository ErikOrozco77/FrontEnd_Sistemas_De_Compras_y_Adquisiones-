import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedorService } from '../../_services/proveedor.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['id', 'nombre', 'primerApellido', 'catGiro','representanteLegalMail', 'razonSocial', 'rfc', 'telefono', 'INE', 'Constancia'];
  showNoResultsMessage: boolean = false;
  dataSource: MatTableDataSource<any>;
  avatarUrl: string = '';
  fullName: any;
  showLogoutOptions: boolean = false;
  constructor(
    private proveedorService: ProveedorService,
    private authService: AuthService,
    private router: Router,
    private proveedorModalService: ProveedorModalService,
    private http: HttpClient
  ) {
    this.dataSource = new MatTableDataSource<any>();

  }
  

  ngOnInit(): void {
    const userData = window.sessionStorage.getItem('auth-user');
    if (userData) {
      const user = JSON.parse(userData);
      const name = user.data.name; 
      this.fullName= user.data.name;
      const words = name.split(" ");
      let initials = words[0].charAt(0);
      if (words.length > 1) {
        initials += words[1].charAt(0);
      }
      
      this.avatarUrl = `https://ui-avatars.com/api/?name=${initials}`;
      console.log(initials);
    }
    
    
    this.proveedorService.getAllProveedores().subscribe(
      (proveedoresData) => {
        this.proveedores = proveedoresData.data;
        this.dataSource.data = this.proveedores;
      },
      (error) => {
        console.error('Error al obtener proveedores', error);
      }
    );
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.dataSource) {
      this.dataSource.filter = filterValue;
      this.showNoResultsMessage = this.dataSource.filteredData.length === 0;
    }
  }

  onRowClicked(row: any): void {
    this.proveedorModalService.openProveedorModal(row);
  }
  toggleLogoutButton(): void {
    this.showLogoutOptions = !this.showLogoutOptions; // Alternar la visibilidad de las opciones de cierre de sesión
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
    event.stopPropagation();

    this.proveedorService.downloadINE(userId.toString()).subscribe(
      (response: HttpResponse<Blob>) => {
        const data: Blob = response.body as Blob;
        this.descargarArchivo(data, `INE_${userId}.pdf`);
      },
      (error) => {
        alert('INE no disponible para descarga en este momento.');
      }
    );
  }
  
  descargarConstancia(event: Event, userId: number): void {
    event.stopPropagation();
    this.proveedorService.downloadConstancia(userId.toString()).subscribe(
      (response: HttpResponse<Blob>) => {
        const data: Blob = response.body as Blob;
        this.descargarArchivo(data, `Constancia_${userId}.pdf`);
      },
      (error) => {
        alert('Constancia no disponible para descarga en este momento.');
      }
    );
  }

  descargarExcel(): void {
    this.proveedorService.downloadProveedoresExcel().subscribe(
      (response: HttpResponse<Blob>) => {
        const data: Blob = response.body as Blob;
        this.descargarArchivo(data, 'proveedores.xlsx');
      },
      (error) => {
        alert('Error al descargar el archivo Excel de proveedores');
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

  navigateToRegisterConcurso(): void {
    this.router.navigate(['/register-concurso']);
  }
  navigateToListarConcursos(): void {
    this.router.navigate(['/ListarConcursos']);
  }
  navigateToRegisterWinner():void{
    this.router.navigate(['/SeleccionGanador'])
  }

  navigateToInvitacion() {
    this.router.navigate(['/menu-concurso']);
  }
  navigateToProveedoresConcursantes(): void {
    this.router.navigate(['/menu-proveedoresConcursantes']);
  }
  
}
