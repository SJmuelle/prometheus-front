import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class GestionPagaduriaService {
  constructor(
    private _http: HttpClient,
    private _appSettings: AppSettingsService
    
  ) { }

  public getContactos(usuario: string): Observable<any>{
    return this._http.get(`${this._appSettings.gestionPagaduria.url.pagadurias}/${usuario}`);
  } 

  public getPlazos(usuario:string): Observable<any>{
    return this._http.get(`${this._appSettings.gestionPagaduria.url.configuracion}/${usuario}`);
  
}
public crearInformacionPagadurias(nitPagaduria: string): Observable<any> {
  const url = `${this._appSettings.gestionPagaduria.url.informacion}/cre-lib-info-pagadurias`;
  const body = { nitPagaduria };
  return this._http.post(url, body).pipe(
    map(response => {
      // Manejar la respuesta aquí si es necesario
      return response;
    })
  );
}

}