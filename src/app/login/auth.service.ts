import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../pages/models-scanner/usuario'
import { SessionStorageService } from '../security/crypt/sessionStorage.service'
import { env } from "../../environments/environment"
import { Role } from '../pages/models-scanner/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private sessionService: SessionStorageService
  ) {
  }

  public login(username: string, userpass: string) {


    const credenciales = btoa(`${env.APP_CLIENT}:${env.APP_PASSWORD}`);
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + credenciales });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', userpass);
    return this.http
      .post<any>(
        `${env.APP_ENDPOINT}/oauth/token`, params.toString(), { headers: httpHeaders }
      )
      .toPromise();
  }

  //Guarda usuario en session storage
  public saveUser(data: any) {
    let usuario = new Usuario();
    usuario.userFromPayload(data);
    this.sessionService.setItem(env.USER_STORAGE, usuario);
  }

  //Obtiene usuario del session storage
  public getUser(): Usuario {
    const user = this.sessionService.getItem(env.USER_STORAGE);
    return user ? JSON.parse(user) as Usuario : null;
  }

  //Obtiene arreglo de roles
  public getUserRoles(): Role[] {
    return this.getUser().roles;
  }

  //Cierra sesion
  public logOut(): void {
    this.sessionService.clear();
  }
}
