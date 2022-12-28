import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class EdicionTrazabilidadResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     */
    resolve()
    {
        localStorage.setItem("trazabilidad","no")
    }
}
