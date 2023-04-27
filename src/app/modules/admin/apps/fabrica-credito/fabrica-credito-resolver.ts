import { Injectable } from "@angular/core";
import { Resolve, Router } from "@angular/router";


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
@Injectable({
    providedIn: 'root'
})
export class EdicionFormularioResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private router: Router,
    )
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
        this.router.events.subscribe((url: any) => {});
        let ruta=this.router.url;
        localStorage.setItem("rutaAnterior",ruta)
    }
}