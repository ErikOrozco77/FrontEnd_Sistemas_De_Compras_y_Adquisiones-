import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProveedorService } from '../../_services/proveedor.service'

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
        private router: Router, 
        private proveedorService: ProveedorService
        

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

        const userData = this.storageService.getUser();
        if (userData) {
            const rolId = userData.data.rol;
            console.log('Rol del usuario:', rolId);

            if (rolId === 1) {
                console.log('Redirigiendo a /admin-mode');
                this.router.navigate(['/admin-mode']);
            } else {
                this.verificarExistenciaProveedor(userData.data.id);
            }
        } else {
            console.error('Error: No se pudo obtener la información del usuario.');
            this.router.navigate(['/error']);
        }
    }


    private handleFailedLogin(error: any): void {
        alert(error.error.message);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
    }


    verificarExistenciaProveedor(userId: number): void {
        this.proveedorService.verificarExistenciaProveedor(userId).subscribe(
            (response) => {
                const proveedorExists = response.proveedorExists;
                if (!proveedorExists) {
                    // El proveedor no existe, redirigir a la ruta de registro de proveedor
                    this.router.navigate(['/dashboard/registerProveedor']);
                }else{
                    this.router.navigate(['/dashboard']);

                }
            },
            (error) => {
                console.error('Error al verificar proveedor:', error);
                this.router.navigate(['/error']);
            }
        );
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    
}
