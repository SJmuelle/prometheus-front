import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormularioCreditoService {

  constructor(
    private _utilityService: UtilityService,
    private _appSettings: AppSettingsService
  ) { }

  postDatos(data) {
    return this._utilityService.postQuery(this._appSettings.formulario.url.microcredito,data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  cargueInicial(data) {
    return this._utilityService.postQuery(this._appSettings.formulario.url.cargueInicial,data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
