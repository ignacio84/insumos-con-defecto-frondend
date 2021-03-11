import { Injectable } from '@angular/core';
import { AppSettings } from '../AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../pages/models-scanner/usuario'
import { Role } from '../pages/models-scanner/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public saveUser(payload: any) {
    let usuario = new Usuario();
    usuario.userFromPayload(payload);
    AppSettings.USER = usuario;
    sessionStorage.setItem('usuario', JSON.stringify(usuario));//Convierte objeto JSON y lo guarda en el session sessionStorage
  }

  public login(username: string, userpass: string) {
    const credenciales = btoa(AppSettings.APP_CLIENT + ':' + AppSettings.APP_PASSWORD);
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + credenciales });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', userpass);
    return this.http
      .post<any>(
        `${AppSettings.API_ENDPOINT}/oauth/token`, params.toString(), { headers: httpHeaders }
      )
      .toPromise();
  }

  //GUARDA TOKEN EN EL SESSION STORAGE
  public saveTockenInSessionStorage(data: any): void {
    sessionStorage.setItem('access_token', data.access_token);//convierte Objeto a JSON
    sessionStorage.setItem('refresh_token', data.refresh_token);//convierte Objeto a JSON
    sessionStorage.setItem('expires_in', data.expires_in);//convierte Objeto a JSON
    this.saveUserInSessionStorage(JSON.parse(atob(data.access_token.split(".")[1])));
  }

  //GUARDA USUARIO EN EL SESSION STORAGE
  private saveUserInSessionStorage(payload: any) {
    let usuario = new Usuario();
    usuario.userFromPayload(payload);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));//Convierte objeto JSON y lo guarda en el session sessionStorage
  }

  //METODO VALIDA USUARIO LOGEADO OBTIENE IFORMACION DEL SESSION STORAGE
  public isLogin(): boolean {
    return JSON.parse(sessionStorage.getItem('usuario')) ? true : false;//Valida sesion del usuario
  }

  //OBTIENE USUARIO LOGEADO, OBTIENE IFORMACION DEL SESSION STORAGE
  public getUser(): Usuario {
    return JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
  }

  //OBTIENE LOS ROLES DEL USUARIOS, OBTIENE IFORMACION DEL SESSION STORAGE
  public getRolesUser(): Role[] {
    return this.getUser().roles;
  }

  //VALIDA QUE EL SUARIO TENGA AL MENOS UN ROL DEL LISTADO DE ROLES RECIBIDOS
  public validRoles(roles: string[]): boolean {
    return this.getRolesUser().some(r => roles.find(x => x.toString() == r.toString()));
  }

  //METODO LIMPIA DATOS DE SESSION STORAGE
  public logOut(): void {
    console.log();
    sessionStorage.clear();
  }

  public isSessionExpired() {

  }
}
