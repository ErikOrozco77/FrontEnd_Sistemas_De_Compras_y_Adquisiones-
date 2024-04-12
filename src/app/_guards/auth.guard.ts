import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private storageService: StorageService) {}


  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const userData = this.storageService.getUser();
      const rolId = userData.data.rol;
      if (rolId === 2) {
        return true;
      } else {
        this.router.navigate(['/admin-mode']);
        return false;
        

      }
    } else {
      return false;
    }
  }
}