import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingsService} from "../app-configs/app-settings.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrasladoService {

  constructor(private _http: HttpClient, private _appSettings: AppSettingsService) { }

  
}
