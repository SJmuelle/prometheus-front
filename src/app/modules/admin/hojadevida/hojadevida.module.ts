import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HojadevidaComponent } from './hojadevida.component';
import { SharedModule } from 'app/shared/shared.module';
import { CreditoComponent } from '../../../components/hojadevida/credito/credito.component';
import { CarteraComponent } from '../../../components/hojadevida/cartera/cartera.component';
import { DatatableComponent } from '../../../components/datatable/datatable.component';
import { TipoPqrsComponent } from '../../../components/hojadevida/pqrs/tipo-pqrs/tipo-pqrs.component';
import { ModalTipoPqrsComponent } from '../../../components/hojadevida/pqrs/modal-tipo-pqrs/modal-tipo-pqrs.component';
import { DiasnohabilesComponent } from '../../../components/hojadevida/pqrs/diasnohabiles/diasnohabiles.component';
import { ModaldiasnohabilesComponent } from '../../../components/hojadevida/pqrs/modaldiasnohabiles/modaldiasnohabiles.component';
import { CausalespqrsComponent } from '../../../components/hojadevida/pqrs/causalespqrs/causalespqrs.component';
import { ModalescausalespqrsComponent } from '../../../components/hojadevida/pqrs/modalescausalespqrs/modalescausalespqrs.component';
import { ResponsablespqrsComponent } from '../../../components/hojadevida/pqrs/responsablespqrs/responsablespqrs.component';
import { ModalresponsablespqrsComponent } from '../../../components/hojadevida/pqrs/modalresponsablespqrs/modalresponsablespqrs.component';
import { SolucionpqrsComponent } from '../../../components/hojadevida/pqrs/solucionpqrs/solucionpqrs.component';
import { ProcedimientopqrsComponent } from '../../../components/hojadevida/pqrs/procedimientospqrs/procedimientopqrs.component';
import { ModalsolucionpqrsComponent } from '../../../components/hojadevida/pqrs/modalsolucionpqrs/modalsolucionpqrs.component';
import { ModalprocedimientopqrsComponent } from '../../../components/hojadevida/pqrs/modalprocedimientopqrs/modalprocedimientopqrs.component';
import { HojadevidaService } from 'app/resources/services/hojadevida/hojadevida.service';

const routes: Routes = [
    { path: 'hv', component: HojadevidaComponent },
    // { path: 'pqrs', component: TipoPqrsComponent },
    // { path: 'dias-no-habiles', component: DiasnohabilesComponent },
    // { path: 'causales', component: CausalespqrsComponent },
    // { path: 'responsables', component: ResponsablespqrsComponent },
    // { path: 'solucion', component: SolucionpqrsComponent },
];

@NgModule({
    declarations: [
        HojadevidaComponent,
        CreditoComponent,
        CarteraComponent,

        DatatableComponent,
        TipoPqrsComponent,
        ModalTipoPqrsComponent,
        DiasnohabilesComponent,
        ModaldiasnohabilesComponent,
        CausalespqrsComponent,
        ModalescausalespqrsComponent,
        ResponsablespqrsComponent,
        ModalresponsablespqrsComponent,
        SolucionpqrsComponent,
        ProcedimientopqrsComponent,
        ModalsolucionpqrsComponent,
        ModalprocedimientopqrsComponent,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    providers: [HojadevidaService],
})
export class HojadevidaModule {}
