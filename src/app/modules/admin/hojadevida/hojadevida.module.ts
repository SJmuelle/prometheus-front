import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HojadevidaComponent } from './hojadevida.component';
import { SharedModule } from 'app/shared/shared.module';
import { CreditoComponent } from '../../../components/hojadevida/credito/credito.component';
import { ModalcreditoComponent } from '../../../components/hojadevida/modalcredito/modalcredito.component';
import { CarteraComponent } from '../../../components/hojadevida/cartera/cartera.component';
import { ModalcarteraComponent } from '../../../components/hojadevida/modalcartera/modalcartera.component';
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
import { ModalsolucionpqrsComponent } from '../../../components/hojadevida/pqrs/modalsolucionpqrs/modalsolucionpqrs.component';
import { HojadevidaService } from 'app/resources/services/hojadevida/hojadevida.service';

const routes: Routes = [
    { path: 'hv', component: HojadevidaComponent },
    { path: 'pqrs', component: TipoPqrsComponent },
    { path: 'dias-no-habiles', component: DiasnohabilesComponent },
    { path: 'causales', component: CausalespqrsComponent },
    { path: 'responsables', component: ResponsablespqrsComponent },
    { path: 'solucion', component: SolucionpqrsComponent },
];

@NgModule({
    declarations: [
        HojadevidaComponent,
        CreditoComponent,
        ModalcreditoComponent,
        CarteraComponent,
        ModalcarteraComponent,
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
        ModalsolucionpqrsComponent,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    providers: [HojadevidaService],
})
export class HojadevidaModule {}
