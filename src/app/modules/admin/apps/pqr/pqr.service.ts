import { Injectable } from '@angular/core';
import { UtilityService } from 'app/resources/services/utility.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PqrService {

  constructor(private _utility: UtilityService) {

  }

  setTipo() {
    let url: string = `/tk/informacion-tipo-pqrs`;
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  setCausales() {
    let url: string = `/tk/informacion-causales-pqrs`;
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  setSoluciones() {
    let url: string = `/tk/informacion-pqrs-soluciones`;
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  setResponsables() {
    let url: string = `/tk/informacion-responsables-pqrs`;
    return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  Create(url: string, data: any): Observable<any> {
    return this._utility.postQuery(url, data)
    .pipe(map((result: any) => {
      return result;
    }));
  }


}
