import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    const role = route.data.role;
    if (currentUser) {
      if (role && role.indexOf(this.authService.getUserRole()) > -1) {
        return true;
      } else {
        return false;
      }
    }

    this.router.navigate(['/events'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
