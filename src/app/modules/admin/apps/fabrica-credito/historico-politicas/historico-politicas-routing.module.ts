import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoPoliticasComponent } from './historico-politicas.component';
import { PoliticasAgendasComponent } from './politicas-agendas/politicas-agendas.component';

const routes: Routes = [
    {
        path: '',
        component: HistoricoPoliticasComponent,
    },
    {
        path: 'politicas-agendas/:num/:id',
        component: PoliticasAgendasComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HistoricoPoliticasRoutingModule {}
