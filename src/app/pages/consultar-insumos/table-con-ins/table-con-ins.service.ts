import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../../environments/environment'
import { ConsultarInsumosInterface } from '../consultar-insumos.interface';

@Injectable({
  providedIn: 'root'
})
export class TableConInsService {

  constructor(private http: HttpClient) { }

  public test() {
    const articulos: string[] = env.ARTICULOS;
    return this.http
      .post<any>(
        `${env.APP_ENDPOINT}/insumos/postArticulos`, { articulos }
      )
      .toPromise();
  }


  public postInsumos(formConsultar: ConsultarInsumosInterface) {
    return this.http
      .post<any>(
        `${env.APP_ENDPOINT}/insumos/postInsumos`, {
          dateFrom: formConsultar.dateFrom,
          dateTo: formConsultar.dateTo,
        }
      )
      .toPromise();
  }




}
