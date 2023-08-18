import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaFormalizacionRoutingModule } from './agenda-formalizacion-routing.module';
import {GridAgendaFormalizacionComponent} from './grid-agenda-formalizacion/grid-agenda-formalizacion.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import {FuseAlertModule} from "../../../../../../@fuse/components/alert";
import { FuseCardModule } from '@fuse/components/card';
import {MatTableModule} from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
      GridAgendaFormalizacionComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatTabsModule,
        MatDividerModule,
        AgendaFormalizacionRoutingModule,
        MatIconModule,
        MatButtonModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        NgxPaginationModule,
        FuseAlertModule,
        FuseCardModule,
        MatTableModule,
        MatTooltipModule,
        MatBadgeModule,
        SharedModule
    ]
})
export class AgendaFormalizacionModule { }
