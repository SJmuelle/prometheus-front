import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(
      private _http: HttpClient,
      private _appSettings: AppSettingsService
  ) { }
  /**
   * @description: Obtiene los comentarios
   */
  public  getComentarios(codigo: string): Observable<any> {
      return this._http.get(`${this._appSettings.comentarios.url.baseComentario}/${codigo}`);
  }
  /**
   * @description: Crea un comentario
   */
  public postComentario(datos: any): Observable<any> {
      return this._http.post(this._appSettings.comentarios.url.baseComentarioCrear, datos);
  }

   /**
   * @description: Crea un comentario para devolver
   */
    public postComentarioDevolver(datos: any): Observable<any> {
      return this._http.post(this._appSettings.comentariosDevolverFabrica.url.baseComentarioCrear, datos);
  }
}
