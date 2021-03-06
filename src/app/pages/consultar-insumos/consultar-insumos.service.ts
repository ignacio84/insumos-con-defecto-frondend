import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../AppSettings';

@Injectable({
  providedIn: 'root'
})
export class ConsultarInsumosService {

  constructor(private http: HttpClient) { }

  public test() {
    return this.http
      .get<any>(
        `${AppSettings.API_ENDPOINT}/insumos/all`, {}
      )
      .toPromise();
  }
}
