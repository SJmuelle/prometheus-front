import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HojadevidaComponent } from './hojadevida.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';


const routes: Routes = [
  { path: '', component: HojadevidaComponent }
];

@NgModule({
  declarations: [
    HojadevidaComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class HojadevidaModule { }
