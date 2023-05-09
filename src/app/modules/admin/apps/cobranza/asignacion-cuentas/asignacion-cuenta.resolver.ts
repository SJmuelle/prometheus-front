import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CajaVirtualService } from 'app/core/services/caja-virtual.service';
import {  Observable, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AsignacionCuentaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor( private _cajaVirtualService:
        CajaVirtualService)
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
        return this._cajaVirtualService.getCuentasAsignadas();
    }
}