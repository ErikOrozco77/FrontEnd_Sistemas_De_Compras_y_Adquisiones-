import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    sitekey: string ="";
    loginForm!: FormGroup;
    isLoggedIn = false;
    submitted = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    showMessage = false;
    message = '';
    showPassword = false;
    captchaResolved = false;

    constructor(
        private authService: AuthService,
        private storageService: StorageService,
        private router: Router
        

    ) {}//this.sitekey='6LeRS4AoAAAAAB0ALGIBUKTpZKD1cIah4rsxnmDy'; this.captchaResolved = false;

    ngOnInit(): void {
        this.createForm();
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
        }
    }

    createForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    onCaptchaResolved(response: string | Event): void {
        if (typeof response === 'string') {
            this.captchaResolved = true;
            console.log('CAPTCHA resuelto correctamente');
        }
    }

    onSubmit(): void {
        //this.submitted = true;
        //if (!this.captchaResolved) {
        //    alert('Por favor, resuelva el CAPTCHA antes de iniciar sesión.');
         //   return;
        //}
        //if (this.loginForm.invalid) {
         //   alert('Sus credenciales no son válidas');
         //   return;
        //}
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        this.authService.Inicio(email, password).subscribe(
            (data) => {
                this.handleSuccessfulLogin(data);
                this.showMessage = true;
                this.message = 'acceso correcto';
                const rolId = data.data.rol;
                
            },
            (error) => {
                this.handleFailedLogin(error);
            }
        );

    }

    private handleSuccessfulLogin(data: any): void {
        this.storageService.saveUser(data);
        this.authService.user = data;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        const rolId = data.data.rol;

        // Agregar lógica de redirección según el rol
        if (rolId === 1) {
            // Redirigir al modo admin
            this.router.navigate(['/admin-mode']);
        } else {
            // Redirigir a otra ruta según tus necesidades
            this.router.navigate(['/dashboard']);
        }
    }

    private handleFailedLogin(error: any): void {
        alert(error.error.message);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    
}
