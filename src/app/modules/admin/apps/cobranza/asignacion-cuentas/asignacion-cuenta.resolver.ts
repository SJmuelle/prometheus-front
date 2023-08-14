import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CobranzaService } from 'app/core/services/cobranza.service';
import {  Observable, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AsignacionCuentaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor( private _cobranzaService:
        CobranzaService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>
    {
        return this._cobranzaService.getCuentasAsignadas();
    }
}