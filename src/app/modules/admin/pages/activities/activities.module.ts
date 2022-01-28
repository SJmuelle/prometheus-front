import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ActivitiesComponent } from 'app/modules/admin/pages/activities/activities.component';
import { activitiesRoutes } from 'app/modules/admin/pages/activities/activities.routing';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseCardModule } from '@fuse/components/card';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { PreviewComponent } from './preview/preview.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        ActivitiesComponent,
        PreviewComponent
    ],
    imports     : [
        RouterModule.forChild(activitiesRoutes),
        MatIconModule,
        SharedModule,
        ScrollingModule,
        MatSidenavModule,
        FuseCardModule,
        PdfViewerModule,
        MatDialogModule
    ]
})
export class ActivitiesModule
{
}
