import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  ruta: string;
  constructor() { }

  permisoPorModuleTrazxabilidad(ruta: any){
    let valor=  ruta.includes('trazabilidad')|| this.permisoPorModuleTrazabilidad();
    
    return valor
  }

  estabaFormulario(ruta: any){

    let valor= ruta.includes('formularios');
    return valor;
  }

  estabaAgendaComercial(){
    let ruta = localStorage.getItem("rutaAnterior");
    let rutaAnterior=ruta.includes('agenda-comercial');
    return rutaAnterior;
  }

  anteriorRuta(ruta: string){
    this.ruta = ruta;
  }

  permisoPorModuleTrazabilidad(){
    let trazabilidad = localStorage.getItem("trazabilidad");

    return  trazabilidad=='si';
  }

}
