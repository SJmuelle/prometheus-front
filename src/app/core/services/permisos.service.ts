import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor() { }

  permisoPorModuleTrazxabilidad(ruta: any){
    let valor=  ruta.includes('trazabilidad')|| this.permisoPorModuleTrazabilidad();
    
    return valor
  }

  permisoPorModuleTrazabilidad(){
    let trazabilidad = localStorage.getItem("trazabilidad");

    return  trazabilidad=='si';
  }

}
