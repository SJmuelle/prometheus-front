import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaVirtualService {

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  /**
   * @description: Obtiene listado de informacion-negocios-asignados 
   */
   public getInformacionNegocios(): Observable<any> {
    //  const { numeroSolicitud, tipoDocumento } = datos;
    // valores-negocios-asignados	v_codigoNegocio,v_identificacion

        let data = `{"v_user": "smuelle"}`;
// let data={}
return this._http.get(`${this._appSettings.cajaVirtual.url.infoNegocio}`)

    // return this._http.post(this._appSettings.cajaVirtual.url.infoNegocio,data);
  }
}
