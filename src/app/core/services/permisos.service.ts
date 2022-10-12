import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor() { }

  permisoPorModuleTrazxabilidad(ruta: any){
    return  ruta.includes('trazabilidad');
  }

}
