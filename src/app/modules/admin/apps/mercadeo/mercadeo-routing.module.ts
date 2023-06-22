import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporterdMercadeoComponent } from './reporterd-mercadeo/reporterd-mercadeo.component';

const routes: Routes = [{
  path: 'reporterd', component: ReporterdMercadeoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MercadeoRoutingModule { }
