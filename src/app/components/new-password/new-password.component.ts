import { Component } from '@angular/core';
import { PasswordService } from 'src/app/_services/password.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
    isResetting: boolean = false;
    newPassword: string = '';
    confirmPassword: string = '';
    newPasswordVisible: boolean = false;
    confirmPasswordVisible: boolean = false;
    token: string = '';
  
    constructor(private passwordService: PasswordService, private route: ActivatedRoute,private router: Router,) {
      this.route.params.subscribe(params => {
        this.token = params['token'];
      });
    }
  
    resetPassword(): void {
      this.isResetting = true;
      this.passwordService.resetPassword(this.token, this.newPassword).subscribe(
        () => {
          alert('Contraseña registrada con éxito');
          this.isResetting = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Error al restablecer la contraseña:');
          this.isResetting = false;
        }
      );
    }

    togglePasswordVisibility(field: string): void {
      if (field === 'newPassword') {
        this.newPasswordVisible = !this.newPasswordVisible;
      } else if (field === 'confirmPassword') {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
      }
    }
}
