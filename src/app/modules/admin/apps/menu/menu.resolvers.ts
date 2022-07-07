import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from './menu.service';


@Injectable({
    providedIn: 'root'
})
export class MenuResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _menuService: MenuService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolve
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._menuService.getIcons('/ui/icons/heroicons-outline');
    }
}



@Injectable({
    providedIn: 'root'
})
export class EmpresaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _menuService: MenuService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolve
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._menuService.getEmpresas();
    }
}
