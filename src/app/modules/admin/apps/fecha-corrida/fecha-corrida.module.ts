import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULOS
import { FuseCardModule } from '../../../../../@fuse/components/card/card.module';
import { FuseAlertModule } from '@fuse/components/alert';
import { NgxPaginationModule } from 'ngx-pagination';

// MODULOS MATERIAL
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FechaCorridaRoutingModule } from './fecha-corrida-routing.module';
import { FacturaComponent } from './factura/factura.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SearchPipe } from './factura/filterproveedor.pipe';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
// import { MatSelectSearchModule } from 'mat-select-search';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    FacturaComponent,
    SearchPipe
  ],
    imports: [
        CommonModule,
        FechaCorridaRoutingModule,
        FuseCardModule,
        FuseAlertModule,
        NgxPaginationModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatAutocompleteModule,
        FuseScrollbarModule,
        ScrollingModule,
        // NgxMatSelectSearchModule,
        // MatSelectSearchModule
    ]
})
export class FechaCorridaModule { }
