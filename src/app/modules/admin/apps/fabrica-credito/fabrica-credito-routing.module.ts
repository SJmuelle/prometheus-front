import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaCompletacionModule } from './agenda-completacion/agenda-completacion.module';
import { GestionFabricaCreditoModule } from './gestion-fabrica-credito/gestion-fabrica-credito.module';
import { AgendaReferenciacionModule } from "./agenda-referenciacion/agenda-referenciacion.module";
import { AgendaComercialModule } from "./agenda-comercial/agenda-comercial.module";
import { ParametriaModule } from './parametria/parametria.module';
import { AgendaDecisionModule } from './agenda-decision/agenda-decision.module';
import { TrazabilidadCreditoModule } from './trazabilidad-credito/trazabilidad-credito.module';
import { AgendaGestionCarteraModule } from './agenda-gestion-cartera/agenda-gestion-cartera.module';
import { AgendaFormalizacionModule } from "./agenda-formalizacion/agenda-formalizacion.module";
import { ReferidosModule } from './referidos/referidos.module';
import { AsignarSolicitudesModule } from './asignar-solicitudes/asignar-solicitudes.module';
import { EdicionFormularioResolver, EdicionTrazabilidadResolver } from './fabrica-credito-resolver';
import { FormulariosModule } from './formularios/formularios.module';
import { AgendaVentaModule } from './agenda-venta/agenda-venta.module';
import { AgendaComiteComercialModule } from './agenda-comite-comercial/agenda-comite-comercial.module';
import { AgendaVisitasModule } from './agenda-visitas/agenda-visitas.module';
import { AgendaFirmaDigitalModule } from './agenda-firma-digital/agenda-firma-digital.module';
import { ExcepcionCreditoComponent } from './excepcion-credito/excepcion-credito.component';
import { AsignacionBarriosModule } from './asignacion-barrios/asignacion-barrios.module';
import { HistoricoPoliticasModule } from './historico-politicas/historico-politicas.module';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'parametria',
                loadChildren: () => ParametriaModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'referidos',
                loadChildren: () => ReferidosModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'agenda-comercial',
                loadChildren: () => AgendaComercialModule,
                resolve: { EdicionTrazabilidadResolver }

            },
            {
                path: 'agenda-completion',
                loadChildren: () => AgendaCompletacionModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'credit-management',
                loadChildren: () => GestionFabricaCreditoModule,
            },
            {
                path: 'agenda-referencing',
                loadChildren: () => AgendaReferenciacionModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'agenda-decision',
                loadChildren: () => AgendaDecisionModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'agenda-venta-digital',
                loadChildren: () => AgendaVentaModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'agenda-cartera',
                loadChildren: () => AgendaGestionCarteraModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'trazabilidad',
                loadChildren: () => TrazabilidadCreditoModule
            },
            {
                path: 'agenda-formalizacion',
                loadChildren: () => AgendaFormalizacionModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'asignar-solicitudes',
                loadChildren: () => AsignarSolicitudesModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'formularios',
                loadChildren: () => FormulariosModule
            },
            {
                path: 'agenda-comite-comercial',
                loadChildren: () => AgendaComiteComercialModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'agenda-visitas',
                loadChildren: () => AgendaVisitasModule,
                resolve: { EdicionTrazabilidadResolver }
            },
            {
                path: 'agenda-firma-digital',
                loadChildren: () => AgendaFirmaDigitalModule,
                resolve: { EdicionTrazabilidadResolver },

            },
            {
                path: 'excepcion-creditos',
                component: ExcepcionCreditoComponent
            }
            ,
            {
                path: 'asignacion-barrios',
                loadChildren: () => AsignacionBarriosModule,
            },
            {
                path: 'historico-politicas',
                loadChildren: () => HistoricoPoliticasModule
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FabricaCreditoRoutingModule { }
