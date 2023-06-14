import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DetallePlazoComponent } from './detalle-plazo/detalle-plazo.component';

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGestionPlazo implements CanDeactivate<DetallePlazoComponent>
{
    canDeactivate(
        component: DetallePlazoComponent,
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
        
        // If the next state doesn't contain '/pagaduria'
        // it means we are navigating away from the
        // Asignacion app
        if ( !nextState.url.includes('/gestion-plazo') )
        {
            // Let it navigate
            return true;
        }

        // If we are navigating to another asignacion...
        if ( nextRoute.paramMap.get('tipoContrato') )
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
