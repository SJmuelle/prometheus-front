import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { HojavidaComponent } from './hojavida.component';
import { ModalcarteraComponent } from 'app/components/hojadevida/modalcartera/modalcartera.component';
import { ModalcreditoComponent } from 'app/components/hojadevida/modalcredito/modalcredito.component';
import { ModalIngresoComponent } from 'app/components/hojadevida/modal-ingreso/modal-ingreso.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { CertificadorDeudaComponent } from './modales/certificador-deuda/certificador-deuda.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';
const routes: Routes = [
    { path: '', component: HojavidaComponent },
    { path: 'certificaciones', component: CertificacionesComponent },
    // { path: 'pqrs', component: TipoPqrsComponent },
    // { path: 'dias-no-habiles', component: DiasnohabilesComponent },
    // { path: 'causales', component: CausalespqrsComponent },
    // { path: 'responsables', component: ResponsablespqrsComponent },
    // { path: 'solucion', component: SolucionpqrsComponent },
];

@NgModule({
    declarations: [
        HojavidaComponent,
        ModalcarteraComponent,
        ModalcreditoComponent,
        ModalIngresoComponent,
        CertificadorDeudaComponent,
        CertificacionesComponent,
    ],
    imports: [
        CommonModule,
        // FormControl,
        MatInputModule,
        MatRadioModule,
        MatFormFieldModule,
        Ng2SearchPipeModule,
        SharedModule,
        RouterModule.forChild(routes),
        NgxPaginationModule,
    ],
})
export class HojavidaModule {}
