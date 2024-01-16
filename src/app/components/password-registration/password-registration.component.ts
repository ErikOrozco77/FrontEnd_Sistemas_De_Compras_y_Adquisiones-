import { PasswordService } from '../../_services/password.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'app-password-registration',
  templateUrl: './password-registration.component.html',
  styleUrls: ['./password-registration.component.css']

})
export class PasswordRegistrationComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  token: string = '';
  passwordsDoNotMatch: boolean = false;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  passwordLengthValid: boolean = true;

  constructor(
    private passwordService: PasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
  }

  togglePasswordVisibility(field: string) {
    const inputElement = this.elementRef.nativeElement.querySelector(`#${field}`);

    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
      const newType = this.passwordVisible ? 'text' : 'password';
      this.renderer.setAttribute(inputElement, 'type', newType);
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
      const newType = this.confirmPasswordVisible ? 'text' : 'password';
      this.renderer.setAttribute(inputElement, 'type', newType);
    }
  }

  onSubmit() {
    if (this.password.length < 8) {
      this.passwordLengthValid = false;
      return;
    } else {
      this.passwordLengthValid = true;
    }
   
    if (this.password !== this.confirmPassword) {
      this.passwordsDoNotMatch = true;
      return; 
    }

    this.passwordService.registerPassword(this.password, this.token).subscribe(
      (response) => {
        alert('Contraseña registrada con éxito');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Error al guardar la contraseña');
      }
    );
  }
}