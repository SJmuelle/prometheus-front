import { Injectable } from '@angular/core';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PqrService {

  constructor(private _utility: UtilityService) {

  }

  // parametrizacion
  setTipo() {
    let url: string = `/tk/informacion-tipo-pqrs`;
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  setCausales() {
    let url: string = `/tk/informacion-causales-pqrs`;
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  setSoluciones() {
    let url: string = `/tk/informacion-pqrs-soluciones`;
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  setResponsables() {
    let url: string = `/tk/informacion-responsables-pqrs`;
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  Create(url: string, data: any): Observable<any> {
    return this._utility.postQuery(url, data)
    .pipe(map((result: any) => {
      return result;
    }));
  }

    // NUEVO METODO PARA ENVIAR CORREOS
  envioCorreos(url, pqrs){
    let data = {
        "pqrs": pqrs,
        "tipo": 1
    }
    return this._utility.postQueryCorreo(url, data)
        .subscribe( (res) => {
            // debugger;
            return res;
        });
    // .pipe(
    //     map((result: any) => {
    //         console.log(result);
    //         return result;
    //     })
    // );
  }

  enviarCorreos(url1):void {
    this.getListados(url1)
      .subscribe((response: any) => {
        if (response) {
          let data={
            "tipoCanalId": "4",
            "campanaId": "375",
            "tipoCanalOrigenId": "7",
            "tipocasoId": "15",
            "tipoDatoContactoId": "7",
            "email": response.email,
            "cedula": response.cedula,
            "tipoIdentificacion": "CED",
            "primerNombre": response.primerNombre,
            "primerApellido": response.primerApellido,
            "etiqueta": response.etiqueta,
            "asunto": response.asunto,
            "descripcion": "PQRS",
            "mensaje": response.descripcion
          }
         let url = "/fintracredit/webresources/sagicc/send-mail-v2";
        this.envioCorreo(url, data)
          .subscribe((response: any) => {
            if (response) {

            }
          })
        }
      })
  }
  envioCorreo(url: string, data: any): Observable<any> {
    return this._utility.postQueryCorreo(url, data)
    .pipe(map((result: any) => {
      return result;
    }));
  }
  postFile(url: string, data: any): Observable<any> {
    return this._utility.postFile(url, data)
    .pipe(map((result: any) => {
      return result;
    }));
  }

  getListados(url: string){
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
}
