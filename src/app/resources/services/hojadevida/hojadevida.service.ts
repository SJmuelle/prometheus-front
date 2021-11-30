import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { UtilityService } from '../utility.service';

@Injectable({
    providedIn: 'root',
})
export class HojadevidaService {
    constructor(private _httpClient: HttpClient,private _utility: UtilityService) {}

    getNegocios(cc: number) {
        // debugger

        let url: string = `/informacion-negocios-por-cliente/${cc}`;
        return this._utility.getQuery(url, true)
      .pipe(map((res: any) => {
        return res.data;
      }));

     
    }

    getInfoCliente(nit: any) {
        return this._httpClient.get(
            environment.urlApi2 + `/informacion-cliente/${nit}`
        );
    }
}
