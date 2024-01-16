import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  mostrarImagen = false;
  usuarioRegistrado = false;
  proveedorId: number = 0;

  constructor(private router: Router, private authService: AuthService) { }
  
  ngOnInit() {
    const proveedorId = localStorage.getItem('proveedorId');
    if (proveedorId) {
      this.usuarioRegistrado = true;
    }
  }
  navigateToRegistro() {
    this.router.navigateByUrl('/dashboard/registerProveedor');
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

  CargarArchivos(){
    this.router.navigateByUrl('/dashboard/uploadFiles');
  }
  

}
