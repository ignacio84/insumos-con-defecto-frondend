import { Injectable } from '@angular/core';
import { env } from "../../../environments/environment"
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class SessionStorageService {

  constructor() { }

  //Encripta y guarda informacion en el session storage
  public setItem(name: string, data: any) {
    data = CryptoJS.AES.encrypt(JSON.stringify(data), env.SECRET_KEY);//ENCRIPTA INFORMACION ANTES DE GUADAR EN SESSION STORAGE
    sessionStorage.setItem(name, data);//GUARDA INFORMACION EN EL SESSION STORAGE
  }

  //Obtiene y desencripta informacion del session storage
  public getItem(data: any) {
    let storage = sessionStorage.getItem(data)
    if (storage) {
      data = CryptoJS.AES.decrypt(storage, env.SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    }
    return null;
  }

  //Limpia el session storage
  public clear(): void {
    sessionStorage.clear();
  }
}
