import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaNegociacionesCarteraService {

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }



  public obtenerNegociacionesCliente(date: any): Observable<any[]> {
    const { dateInit, dateEnd } = date
    return this._http.get<any[]>(`${this._appSettings.negociacionCartera.url.obtenerNegociaciones}/${dateInit}/${dateEnd}`);
  }

}
