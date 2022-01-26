import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { ActivitiesComponent } from 'app/modules/admin/pages/activities/activities.component';
import { activitiesRoutes } from 'app/modules/admin/pages/activities/activities.routing';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseCardModule } from '@fuse/components/card';

@NgModule({
    declarations: [
        ActivitiesComponent
    ],
    imports     : [
        RouterModule.forChild(activitiesRoutes),
        MatIconModule,
        SharedModule,
        ScrollingModule,
        MatSidenavModule,
        FuseCardModule
    ]
})
export class ActivitiesModule
{
}
