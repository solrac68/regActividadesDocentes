import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {RegistroactividadService} from '../services/registroactividad.service';
import {GrupoService} from '../services/grupo.service';

import {ActividadRegistrada} from '../dtos/actividadRegistrada';
import {Grupo} from '../dtos/grupo';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  idGrupo:any = null;
  actividadesRegistradas:ActividadRegistrada[];
  grupo:Grupo;
  suma:any;

  constructor(private route:Router,
    private routeA:ActivatedRoute,
    private registroactividadService:RegistroactividadService,
    private grupoService:GrupoService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){
    this.idGrupo = this.routeA.snapshot.params['id'];

    this.registroactividadService.getRegistroActividadByGrupo(this.idGrupo)
      .subscribe(actividadesRegistradas => {
        this.actividadesRegistradas = actividadesRegistradas;
      });
    
    this.grupoService.getGrupo(this.idGrupo)
      .subscribe(grupo => this.grupo = grupo);

    this.registroactividadService.getSumaActividadesByGrupo(this.idGrupo)
      .subscribe(x => this.suma = x);
  }

  eliminarActividadRegistrada(id){
    this.registroactividadService.deleteRegistroActividad(id)
    .subscribe(() => {
      this.fetchData();
    });
  }



}
