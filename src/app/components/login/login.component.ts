import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ProveedorService } from '../../_services/proveedor.service'
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
    captchaResolved = false;

    sitekey: string = "";
    loginForm!: FormGroup;
    isLoggedIn = false;
    submitted = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    showMessage = false;
    message = '';
    showPassword = false;
    siteKey!: string;

    constructor(
        private authService: AuthService,
        private storageService: StorageService,
        private router: Router,
        private proveedorService: ProveedorService


    ) { this.siteKey = "6Lf35JcpAAAAADm62RxGEYSuzBZHg9sUDgdt6ZQz"; }

    ngOnInit(): void {
        this.createForm();
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            const userData = this.storageService.getUser();
            const rolId = userData.data.rol;
            if (rolId === 1) {
                this.router.navigate(['/admin-mode']);
            } else {
                this.verificarExistenciaProveedor(userData.data.id);
            }
        }
    }

    verificarExistenciaProveedor(userId: number): void {
        this.proveedorService.verificarExistenciaProveedor(userId).subscribe(
            (response) => {
                const proveedorExists = response.proveedorExists;
                if (!proveedorExists) {

                    this.router.navigate(['/dashboard/registerProveedor']);
                } else {

                    this.router.navigate(['/dashboard']);
                }
            },
            (error) => {
                console.error('Error al verificar proveedor:', error);
                this.router.navigate(['/error']);
            }
        );
    }

    createForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    onCaptchaResolved(event: any) {
        this.captchaResolved = true;
    }

     onSubmit(): void {
        this.submitted = true; 
        if (this.captchaResolved) {
            const email = this.loginForm.value.email;
            const password = this.loginForm.value.password;
            this.authService.Inicio(email, password, this.captchaElem.getResponse()).subscribe(
                (data) => {
                    this.handleSuccessfulLogin(data);
                },
                (error) => {
                    this.handleFailedLogin(error);
                }
            );
        } else {
            alert('Por favor, resuelva el captcha antes de iniciar sesión.');
        }
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

            if (rolId === 1) {
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
        //this.resetCaptcha();
    }




    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

}
