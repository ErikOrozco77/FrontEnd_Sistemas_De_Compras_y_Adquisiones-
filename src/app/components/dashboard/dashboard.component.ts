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
  fullName: any;
  showLogoutOptions: boolean = false;
  avatarUrl: string = '';

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

  toggleLogoutButton(): void {
    this.showLogoutOptions = !this.showLogoutOptions; // Alternar la visibilidad de las opciones de cierre de sesión
  }
  
  loadComponentData() {
    const userData1 = window.sessionStorage.getItem('auth-user');
    if (userData1) {
      const userData = JSON.parse(userData1);
      this.fullName = userData.data.name;
      const name = userData.data.name; 
      const words = name.split(" ");
      let initials = words[0].charAt(0);
      if (words.length > 1) {
        initials += words[1].charAt(0);
      }
      
      this.avatarUrl = `https://ui-avatars.com/api/?name=${initials}`;
      
      if (userData) {
        this.verificarExistenciaProveedor(userData.data.id);
      }
    }

  }

  navigateToModificar() {
    this.router.navigateByUrl('dashboard/updateProveedor');
  }


  navigateToBuzon() {
    this.router.navigateByUrl('dashboard/buzon');
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

  verificarExistenciaProveedor(userId: any): void {
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


