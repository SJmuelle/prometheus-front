import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULOS Y RUTAS
import { pqrRoutes } from './pqr.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '../../../../../@fuse/components/card/card.module';
import { QuillModule } from 'ngx-quill';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FuseAlertModule } from '@fuse/components/alert';

// MODULOS MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

// COMPONENTES
import { PqrComponent } from './pqr.component';
import { ListComponent } from './list/list.component';
import { TipopqrComponent } from './tipopqr/tipopqr.component';
import { FormComponent } from './tipopqr/form/form.component';
import { GestionPQRSComponent } from './gestion-pqrs/gestion-pqrs.component';
import { SolucionComponent } from './gestion-pqrs/solucion/solucion.component';
import { CausalesPQRSComponent } from './causales-pqrs/causales-pqrs.component';
import { CreacionPQRSComponent } from './creacion-pqrs/creacion-pqrs.component';
import { SolucionesPQRSComponent } from './soluciones-pqrs/soluciones-pqrs.component';
import { DirectionsComponent } from 'app/shared/modal/directions/directions.component';
import { ResponsablesPQRSComponent } from './responsables-pqrs/responsables-pqrs.component';
import { FormCausalesComponent } from './causales-pqrs/form-causales/form-causales.component';
import { ListUsuarioComponent } from './responsables-pqrs/list-usuario/list-usuario.component';
import { ProcedimientosPQRSComponent } from './procedimientos-pqrs/procedimientos-pqrs.component';
import { FormSolucionesComponent } from './soluciones-pqrs/form-soluciones/form-soluciones.component';
import { InsertarAdjuntosComponent } from './creacion-pqrs/insertar-adjuntos/insertar-adjuntos.component';
import { FormResponsablesComponent } from './responsables-pqrs/form-responsables/form-responsables.component';
import { InsertarCausalLegalComponent } from './creacion-pqrs/insertar-causal-legal/insertar-causal-legal.component';
import { FormProcedimientosComponent } from './procedimientos-pqrs/form-procedimientos/form-procedimientos.component';
import { MensajeCreacionComponent } from './mensaje-creacion/mensaje-creacion.component';
import { MensajeErrorComponent } from './mensaje-error/mensaje-error.component';
// import { CreacionComponent } from './creacion/creacion.component';
// import { CausalesPQRSComponent } from '.causales-pqrs/causales-pqrs.component';

@NgModule({
    declarations: [
        DirectionsComponent,
        CausalesPQRSComponent,
        CreacionPQRSComponent,
        FormCausalesComponent,
        FormComponent,
        FormProcedimientosComponent,
        FormResponsablesComponent,
        FormSolucionesComponent,
        GestionPQRSComponent,
        InsertarAdjuntosComponent,
        InsertarCausalLegalComponent,
        ListComponent,
        ListUsuarioComponent,
        PqrComponent,
        ResponsablesPQRSComponent,
        SolucionesPQRSComponent,
        ProcedimientosPQRSComponent,
        TipopqrComponent,
        SolucionComponent,
        MensajeCreacionComponent,
        MensajeErrorComponent
        // CreacionComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        Ng2SearchPipeModule,
        RouterModule.forChild(pqrRoutes),

        NgxPaginationModule,
        FuseCardModule,

        QuillModule.forRoot(),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatStepperModule,
        MatExpansionModule,
        FuseAlertModule,
    ],
})
export class PqrModule {}
