import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class NegociacionCarteraService {

  constructor(
    private http: HttpClient,
    private _appSettings: AppSettingsService
  ) { }

  /**
   * 
   * @param data 
   * @returns 
   */
  public ObtenerNegociacionCartera(data: string): Observable<any> {

    return this.http.get(`${this._appSettings.negociacionCartera.url.base}/${data}`)
  }


}
