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

  public getPagaduria(): Observable<any>{
    const  usuario=JSON.parse(localStorage.getItem("usuario"));
    return this._http.get(`${this._appSettings.gestionPagaduria.url.pagadurias}/${usuario.user}`);
  } 

  public getPlazos(): Observable<any>{
    const  usuario=JSON.parse(localStorage.getItem("usuario"));
    return this._http.get(`${this._appSettings.gestionPagaduria.url.configuracion}/${usuario.user}`);
  
}
public postInformacionPagadurias(data): Observable<any> {
  return this._http.post(this._appSettings.gestionPagaduria.url.informacion, data)
  .pipe(map((res: any) => {
    return res;
  }));
}

public postInformacionPagaduriasCrear(data): Observable<any> {
  return this._http.post(this._appSettings.gestionPagaduria.url.crear, data)
  .pipe(map((res: any) => {
    return res;
  }));
}

public UpdateInformacionPagadurias(data): Observable<any> {
  return this._http.post(this._appSettings.gestionPagaduria.url.actualizar, data)
  .pipe(map((res: any) => {
    return res;
  }));
}

public postGuardarPlazo(data): Observable<any> {
  return this._http.post(this._appSettings.gestionPagaduria.url.guardarPlazo, data)
  .pipe(map((res: any) => {
    return res;
  }));

}
public postEditarPlazo(data): Observable<any> {
  return this._http.post(this._appSettings.gestionPagaduria.url.editarPlazo, data)
  .pipe(map((res: any) => {
    return res;
  }));

}

public postCrear(data): Observable<any> {
  return this._http.post(this._appSettings.gestionPagaduria.url.crear, data)
  .pipe(map((res: any) => {
    return res;
  }));
}
}