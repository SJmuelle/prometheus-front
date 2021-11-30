import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaCompletacionRoutingModule } from './agenda-completacion-routing.module';
import {GridAgendaCompletacionComponent} from './grid-agenda-completacion/grid-agenda-completacion.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
      GridAgendaCompletacionComponent,
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatTabsModule,
        MatDividerModule,
        AgendaCompletacionRoutingModule,
        MatIconModule,
        MatButtonModule,
        Ng2SearchPipeModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        NgxPaginationModule,
    ]
})
export class AgendaCompletacionModule { }
