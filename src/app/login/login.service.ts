import { Injectable } from '@angular/core';
import { AppSettings } from '../AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../pages/models-scanner/usuario'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

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

  public saveTockenInSessionStorage(data: any): void {
    sessionStorage.setItem('access_token', data.access_token);//convierte Objeto a JSON
    sessionStorage.setItem('refresh_token', data.refresh_token);//convierte Objeto a JSON
    sessionStorage.setItem('expires_in', data.expires_in);//convierte Objeto a JSON
    this.saveUserInSessionStorage(JSON.parse(atob(data.access_token.split(".")[1])));
  }

  private saveUserInSessionStorage(payload: any) {
    let usuario = new Usuario();
    usuario.userFromPayload(payload);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));//Convierte objeto JSON y lo guarda en el session sessionStorage
  }
}
