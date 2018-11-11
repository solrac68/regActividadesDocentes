import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GruposComponent} from './grupos/grupos.component';
import {ActividadesComponent} from './actividades/actividades.component';
import {DetalleActividadRegistradaComponent} from './detalle-actividad-registrada/detalle-actividad-registrada.component';


const routes: Routes = [
  { path: '', redirectTo: '/grupos', pathMatch: 'full' },
  { path: 'grupos', component: GruposComponent },
  { path: 'actividades/:id', component: ActividadesComponent },
  { path: 'detalleActividadRegistrada/:id/:idGrupo', component: DetalleActividadRegistradaComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
