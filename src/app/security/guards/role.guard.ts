import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {
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
    // console.log(`roles permitidos ${roles}`);
    // console.log(`roles del usuario ${JSON.parse(sessionStorage.getItem('usuario')).roles}`);
    if (JSON.parse(sessionStorage.getItem('usuario'))) {//Valida sesion del usuario
      if (JSON.parse(sessionStorage.getItem('usuario'))
        .roles.some(r => roles.find(x => x.toString() == r.toString()))) {//Valida permiso del usuario (roles permitidos)
        Swal.fire('Error', 'Favor de inciar sesión', 'error');
        return true;
      }
    } else {
      Swal.fire('Error', 'No cuenta con los permisos necesarios', 'error');
      sessionStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
