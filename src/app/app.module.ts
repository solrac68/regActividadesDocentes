import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { GruposComponent } from './grupos/grupos.component';
import { HttpClientModule }    from '@angular/common/http';
import { ActividadesComponent } from './actividades/actividades.component';
import { DetalleActividadRegistradaComponent } from './detalle-actividad-registrada/detalle-actividad-registrada.component';

@NgModule({
  declarations: [
    AppComponent,
    GruposComponent,
    ActividadesComponent,
    DetalleActividadRegistradaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
