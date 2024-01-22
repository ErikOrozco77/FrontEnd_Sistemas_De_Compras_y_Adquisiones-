import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { ProveedorService } from '../../_services/proveedor.service'
import { ChangeDetectorRef } from '@angular/core'
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent {
  mostrarImagen = false;
  usuarioRegistrado = false;
  proveedorId: number = 0;

  constructor(private router: Router, private authService: AuthService, private proveedorService: ProveedorService, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadComponentData();
      }
    });
  }

  ngOnInit() {
    this.loadComponentData();
  }

  loadComponentData() {
    this.usuarioRegistrado = localStorage.getItem('usuarioRegistrado') === 'true';
    const userData = this.authService.getUser();
    if (userData) {
      this.verificarExistenciaProveedor(userData.data.id);
    }
  }

  navigateToModificar() {
    this.router.navigateByUrl('dashboard/updateProveedor');
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

  toggleImagen() {
    this.mostrarImagen = !this.mostrarImagen;
  }

  CargarArchivos() {
    this.router.navigateByUrl('/dashboard/uploadFiles');
  }

  verificarExistenciaProveedor(userId: number): void {
    this.proveedorService.verificarExistenciaProveedor(userId).subscribe(
      (response) => {
        const proveedorExists = response.proveedorExists;
        if (!proveedorExists) {
          localStorage.setItem('usuarioRegistrado', 'false');
        } else {
          localStorage.setItem('usuarioRegistrado', 'true');
        }
      },
      (error) => {
        console.error('Error al verificar proveedor:', error);
        this.router.navigate(['/error']);
      },
      () => {
        this.usuarioRegistrado = localStorage.getItem('usuarioRegistrado') === 'true';
        this.cdr.detectChanges();
      }
    );
  }
}


