import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import {AppSettingsService} from "./core/app-configs/app-settings.service";
// import { FormDecisionComponent } from './modules/fabrica-credito/agenda-decision/form-decision/form-decision.component';
// import { FormDialogoChecklistComponent } from './modules/admin/apps/gestion-fabrica-credito/form-dialogo-checklist/form-dialogo-checklist.component';



// import { FormControl } from '@angular/forms';


const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy       : PreloadAllModules
};

@NgModule({
    declarations: [
        AppComponent,
        // FormDialogoChecklistComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, {useHash:true}),

        // Fuse & Fuse Mock API
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core
        CoreModule,
        // Layout
        LayoutModule,
        Ng2SearchPipeModule,
        // FormControl,
        // 3rd party modules
        MarkdownModule.forRoot({}),
        NgxPaginationModule,
        // NgxMaskModule.forRoot(),


    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        AppSettingsService,
    ]
})
export class AppModule
{
}
