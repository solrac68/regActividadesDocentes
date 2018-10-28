import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GruposComponent} from './grupos/grupos.component';

const routes: Routes = [
  { path: '', redirectTo: '/grupos', pathMatch: 'full' },
  { path: 'grupos', component: GruposComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
