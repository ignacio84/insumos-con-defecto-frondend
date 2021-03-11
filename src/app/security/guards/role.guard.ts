import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validations(next.data['role']);
  }


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.validations(route.data['role']);
  }

  //valida usuario con sesion iniciada y permisos de usuarios
  private validations(roles: any): boolean {
    if (!this.authService.getUser()) {
      Swal.fire('Error', 'Favor de inciar sesión', 'error');
      this.router.navigate(['/login']);
      return false;
    }
    if (!this.authService.getUserRoles().some(r => roles.find(x => x.toString() == r.toString()))) {//Valida permiso del usuario (roles permitidos)
      Swal.fire('Error', 'No cuenta con autorización!!', 'error');
      return false;
    }
    return true;
  }
}
