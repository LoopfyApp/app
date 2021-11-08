import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginUserMain } from '../models/users.models';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userSesion: LoginUserMain;
  constructor(
    private authService: AuthService,
    private utilService: UtilsService,
    private navController: NavController,
    private route:Router
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (await this.authService.getUserData()) {     
      return true;
    }

    this.utilService.showToast('Faça login para acessar');
    this.navController.navigateRoot('/login');
    return false;
  }
}
