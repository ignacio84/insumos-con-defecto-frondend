import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FormConInsService {

  constructor(private http: HttpClient) { }


  public postArticulos() {
    const articulos: string[] = env.ARTICULOS
    return this.http
      .post<any>(
        `${env.APP_ENDPOINT}/insumos/postArticulos`, { articulos }
      )
      .toPromise();
  }
}
