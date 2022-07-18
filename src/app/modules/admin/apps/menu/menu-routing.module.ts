import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { EmpresaResolver, MenuResolver } from './menu.resolvers';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    resolve: {
      icons: MenuResolver,
      empresas:EmpresaResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
