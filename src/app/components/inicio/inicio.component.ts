import { Component } from '@angular/core';
import {InicioService } from '../../_services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  email: string = '';
  password: string = '';

  constructor(private inicioService: InicioService) {}

  onSubmit() {
    this.inicioService.inicio(this.email, this.password).subscribe(
      (response) => {
        // Manejar el inicio de sesión exitoso aquí, por ejemplo, almacenar tokens y redirigir al usuario.
        console.log('Inicio de sesión exitoso', response);
      },
      (error) => {
        // Manejar el error de inicio de sesión, mostrar mensaje de error, etc.
        console.error('Error de inicio de sesión', error);
      }
    );
  }
}