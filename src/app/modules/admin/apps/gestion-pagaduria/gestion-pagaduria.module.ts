import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoGestionPagaduriaComponent } from './listado-gestion-pagaduria/listado-gestion-pagaduria.component';
import { GridListadoGestionPagaduriaComponent } from './listado-gestion-pagaduria/grid-listado-gestion-pagaduria/grid-listado-gestion-pagaduria.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxMatDatetimePickerModule } from "@angular-material-components/datetime-picker";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { FuseAlertModule } from '@fuse/components/alert';
import { GestionPagaduriaRoutingModule } from './gestion-pagaduria-routing.module';
import { NavbarComponent } from './listado-gestion-pagaduria/navbar/navbar.component';
import { ListadoGestionPlazosComponent } from './listado-gestion-plazos/listado-gestion-plazos.component';
import { GridListadoGestionPlazosComponent } from './listado-gestion-plazos/grid-listado-gestion-plazos/grid-listado-gestion-plazos.component';
import { FormularioGestionPagaduriaComponent } from './formulario-gestion-pagaduria/formulario-gestion-pagaduria.component';
import { GridFormularioGestionPagaduriaComponent } from './formulario-gestion-pagaduria/grid-formulario-gestion-pagaduria/grid-formulario-gestion-pagaduria.component';
import { MatDialogModule } from '@angular/material/dialog';
import { provideRoutes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ListadoGestionPagaduriaComponent,
    GridListadoGestionPagaduriaComponent,
    NavbarComponent,
    ListadoGestionPlazosComponent,
    GridListadoGestionPlazosComponent,
    FormularioGestionPagaduriaComponent,
    GridFormularioGestionPagaduriaComponent,



  ],
  imports: [
    CommonModule,
    GestionPagaduriaRoutingModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    FuseAlertModule,
    MatDialogModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,

    MatCheckboxModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatTableModule,

  ],
})
export class GestionPagaduriaModule { }





