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

  public getPagaduria(usuario: string): Observable<any>{
    return this._http.get(`${this._appSettings.gestionPagaduria.url.pagadurias}/${usuario}`);
  } 

  public getPlazos(usuario:string): Observable<any>{
    return this._http.get(`${this._appSettings.gestionPagaduria.url.configuracion}/${usuario}`);
  
}
public postInformacionPagadurias(data): Observable<any> {
  return this._http.post(this._appSettings.gestionPagaduria.url.informacion, data)
  .pipe(map((res: any) => {
    return res;
  }));
}

public postGuardar(data): Observable<any> {
  return this._http.post(this._appSettings.gestionPagaduria.url.guardar, data)
  .pipe(map((res: any) => {
    return res;
  }));

}
public postEditar(data): Observable<any> {
  return this._http.post(this._appSettings.gestionPagaduria.url.editar, data)
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