import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from 'src/app/_services/password.service';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  isRequestingReset: boolean = false;
  email: string = '';
  newPassword: string = '';
  token: string = '';
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;
  captchaResolved = false;
  siteKey!: string;

  constructor(private route: ActivatedRoute, private router: Router, private passwordResetService: PasswordService) {
    this.siteKey = "6Lf35JcpAAAAADm62RxGEYSuzBZHg9sUDgdt6ZQz";
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  requestPasswordReset(): void {
    this.isRequestingReset = true;
    // Verificar si el correo electrónico está ingresado
    if (!this.email) {
        alert('Por favor, ingrese un correo electrónico.');
        this.isRequestingReset = false;
        return;
    }

    if (!this.captchaResolved) {
        alert('Por favor, resuelva el captcha antes de enviar la solicitud de restablecimiento de contraseña.');
        this.isRequestingReset = false;
        return;
    }
    this.passwordResetService.requestPasswordReset(this.email, this.captchaElem.getResponse()).subscribe(
      () => {
        alert('Solicitud de contraseña enviada a su correo electrónico');
        this.isRequestingReset = false;
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error:', error);
        if (error.status === 404) {
          alert("El correo electrónico no está registrado.");
        } else {
          alert("Error al enviar la solicitud de restablecimiento de contraseña");
        }
        this.isRequestingReset = false;
      }
    );
  }
  

  onCaptchaResolved(event: any) {
    this.captchaResolved = true;
}
}
