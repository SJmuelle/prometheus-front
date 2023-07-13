import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricaCreditoRoutingModule } from './fabrica-credito-routing.module';
import {MatListModule} from '@angular/material/list';
import localEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GestionFabricaCreditoModule } from './gestion-fabrica-credito/gestion-fabrica-credito.module';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { ExcepcionCreditoComponent } from './excepcion-credito/excepcion-credito.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
// import { FabricaOpcionesComponent } from './fabrica-opciones/fabrica-opciones.component';
registerLocaleData(localEs,'es')
@NgModule({
  declarations: [

    ExcepcionCreditoComponent
  ],
  providers: [{provide:LOCALE_ID, useValue:'es'}],
    imports: [
        CommonModule,
        FabricaCreditoRoutingModule,
        MatListModule,
        GestionFabricaCreditoModule,
        MatSortModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSelectModule,
        FuseDrawerModule,
        MatSidenavModule,
        MatInputModule,
        SharedModule
    ]
})
export class FabricaCreditoModule { }
