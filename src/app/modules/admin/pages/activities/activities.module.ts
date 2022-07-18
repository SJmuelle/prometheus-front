import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfofileComponent } from './infofile/infofile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    declarations: [	
        ActivitiesComponent,
        PreviewComponent,
        InfofileComponent,
   ],
    imports: [
        RouterModule.forChild(activitiesRoutes),
        MatIconModule,
        SharedModule,
        ScrollingModule,
        MatSidenavModule,
        FuseCardModule,
        PdfViewerModule,
        MatDialogModule,
        MatTooltipModule,
        Ng2SearchPipeModule,
        CommonModule
    ]
})
export class ActivitiesModule
{
}
