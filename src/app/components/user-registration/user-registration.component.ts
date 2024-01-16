import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { FormGroup, Validators, FormControl } from '@angular/forms'; // Importa Validators

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn = false;
  submitted = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = "";
  showMessage = false;
  message = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/dashboard']);
    }
  }

  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required,this.emailValidator]),
      rfc: new FormControl('', [Validators.required, this.rfcValidator]),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.value.username;
    const correo = this.loginForm.value.correo;
    const rfc=this.loginForm.value.rfc;

    this.authService.login(username, correo,rfc).subscribe(
      (data) => {
        this.handleSuccessfulLogin(data);
        alert( 'En este momento se envió un enlace a su correo electrónico para continuar con el proceso de registro ')
        this.router.navigate(['/login']);
        window.sessionStorage.clear();
      },
      (error) => {
        this.handleFailedLogin(error);
      }
    );
  }

  private handleSuccessfulLogin(data: any): void {
    this.storageService.saveUser(data);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.roles = this.storageService.getUser().roles;
  }

  private handleFailedLogin(error: any): void {
    alert(error.error.message);
    this.errorMessage = error.error.message;
    this.isLoginFailed = true;
  }

  rfcValidator(control: FormControl): { [key: string]: boolean } | null {
  const rfc = control.value;
  // Expresión regular para validar RFC con longitud entre 12 y 13
  const rfcRegex = /^[A-Za-z\d]{12,13}$/;

  if (!rfcRegex.test(rfc)) {
    return { 'invalidRFC': true };
  }

  return null;
  }

  emailValidator(control: FormControl): { [key: string]: boolean } | null {
  const email = control.value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailRegex.test(email)) {
    return { 'invalidEmail': true };
  }

  return null;
}


}
