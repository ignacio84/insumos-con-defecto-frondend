import { Role } from './role';

export class Usuario {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: Role[] = [];
  access_token: string;
  refresh_token: string;
  expires_in: string;

  public userFromPayload(data: any): void {
    let payload = JSON.parse(atob(data.access_token.split(".")[1]));
    this.access_token = data.access_token
    this.refresh_token = data.refresh_token;
    this.expires_in = data.expires_in;
    this.id = payload.id;
    this.username = payload.user_name;
    this.nombre = payload.nombre;
    this.apellido = payload.apellido;
    this.email = payload.email;
    this.roles = payload.authorities;
  }
}
