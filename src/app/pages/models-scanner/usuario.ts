import { Role } from './role';

export class Usuario {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: Role[] = [];

  public userFromPayload(payload: any): void {
    this.id = payload.id;
    this.username = payload.user_name;
    this.nombre = payload.nombre;
    this.apellido = payload.apellido;
    this.email = payload.email;
    this.roles = payload.authorities;
  }
}
