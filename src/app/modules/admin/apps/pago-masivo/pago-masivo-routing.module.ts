import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportFileComponent } from './import-file/import-file.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'import-file',
        component: ImportFileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoMasivoRoutingModule { }
