import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricaCreditoRoutingModule } from './fabrica-credito-routing.module';
import {MatListModule} from '@angular/material/list';
import localEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { FabricaOpcionesComponent } from './fabrica-opciones/fabrica-opciones.component';
registerLocaleData(localEs,'es')
@NgModule({
  declarations: [
  ],
  providers: [{provide:LOCALE_ID, useValue:'es'}],
    imports: [
        CommonModule,
        FabricaCreditoRoutingModule,
        MatListModule,
    ]
})
export class FabricaCreditoModule { }
