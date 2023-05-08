import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DetalleAsignacionComponent } from './detalle-asignacion/detalle-asignacion.component';

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateAsignacionDetalles implements CanDeactivate<DetalleAsignacionComponent>
{
    canDeactivate(
        component: DetalleAsignacionComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // Get the next route
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while ( nextRoute.firstChild )
        {
            nextRoute = nextRoute.firstChild;
        }
        
        // If the next state doesn't contain '/Asignacion'
        // it means we are navigating away from the
        // Asignacion app
        if ( !nextState.url.includes('/asignacion') )
        {
            // Let it navigate
            return true;
        }

        // If we are navigating to another asignacion...
        if ( nextRoute.paramMap.get('id') )
        {
            // Just navigate
            return true;
        }
        // Otherwise...
        else
        {
            // Close the drawer first, and then navigate
            return component.closeDrawer().then(() => true);
        }
    }
}
