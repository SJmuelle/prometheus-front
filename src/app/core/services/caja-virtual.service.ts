import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CajaVirtualService {

  private _cuentasAsignadas: BehaviorSubject<any[] | null> = new BehaviorSubject(null);


  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }


  /**
 * Getter for _cuentasAsignadas
 */
  get cuentasAsignadas$(): Observable<any[]> {
    return this._cuentasAsignadas.asObservable();
  }


  /**
   * @description: Obtiene listado de informacion-negocios-asignados 
   */
  public getInformacionNegocios(): Observable<any> {
    return this._http.get(`${this._appSettings.cajaVirtual.url.infoNegocio}`)
  }



  /**
   * Get contacts
   */
  getCuentasAsignadas(): Observable<any[]> {
    // return this._httpClient.get<Contact[]>('api/apps/contacts/all').pipe(

    return this._http.get<any>(`${this._appSettings.cajaVirtual.url.infoNegocio}`).pipe(
      tap((respuesta) => {
        debugger
        this._cuentasAsignadas.next(respuesta.data);
      })
    );
  }
}
