import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from 'app/mock-api/common/navigation/data';
import { UtilityService } from 'app/resources/services/utility.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{
    
    private _compactNavigation: any[] = compactNavigation;
    private _defaultNavigation: any[] = defaultNavigation;
    private _futuristicNavigation: any[] = futuristicNavigation;
    private _horizontalNavigation: any[] = horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService, private _utility:UtilityService)
    {
        // Register Mock API handlers
        this.menu();
        this.registerHandlers();
    }

    menu(): void {
        if(localStorage.getItem('accessToken')){
           
            let url: string = `tk/opciones-sistemas`;
            this._utility
                .getQuery(url, true)
                .subscribe((res: any) => {
                  
                    this._compactNavigation = res.data;
                    this._defaultNavigation = res.data;
                    this._futuristicNavigation = res.data;
                    this._horizontalNavigation = res.data;
                });
        }
      

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {

                // Fill compact navigation children using the default navigation
                this._compactNavigation.forEach((compactNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === compactNavItem.id )
                        {
                            compactNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill futuristic navigation children using the default navigation
                this._futuristicNavigation.forEach((futuristicNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === futuristicNavItem.id )
                        {
                            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === horizontalNavItem.id )
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Return the response
                return [
                    200,
                    {
                        compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(this._defaultNavigation),
                        futuristic: cloneDeep(this._futuristicNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation)
                    }
                ];
            });
    }

}
