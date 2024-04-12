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
      },
      (error) => {
      }
    );
  }
}