import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ActividadService} from '../services/actividad.service';
import {RegistroactividadService} from '../services/registroactividad.service';
import {ActividadRegistrada} from '../dtos/actividadRegistrada';
import {Actividad} from '../dtos/actividad';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { isNull } from 'util';


@Component({
  selector: 'app-detalle-actividad-registrada',
  templateUrl: './detalle-actividad-registrada.component.html',
  styleUrls: ['./detalle-actividad-registrada.component.css']
})
export class DetalleActividadRegistradaComponent implements OnInit {

  actRegistrada:ActividadRegistrada = new ActividadRegistrada();
  actividades:Actividad[];
  selectedActividad:Actividad;
  id:any = null;
  idGrupo:any = null;
  error:Boolean = false;
  validation:String;

  fetchData(){
    this.id = this.routeA.snapshot.params['id'];
    this.idGrupo = this.routeA.snapshot.params['idGrupo'];
    if(this.id != 'new'){
      this.registroactividadService.getRegistroActividad(this.id)
        .subscribe(actr => {
          this.actRegistrada = actr; 
          console.log("Id actRegistrada:" + this.actRegistrada.id);
          this.fetchActividadesMaestras();
        });
    }
    else{
      this.fetchActividadesMaestras();
    }

  }

  fetchActividadesMaestras(){
    this.actividadService.getActividades().
    subscribe(acts => {
      this.actividades = acts;
      
      if(this.id != 'new'){
        this.selectedActividad = this.actividades.find(act => act.id == this.actRegistrada.idActividad);
        console.log("selectedActividad :" + this.selectedActividad.descripcion);
      }
      else{
        this.actRegistrada.fecha = new Date();
        this.actRegistrada.idActividad = 2
        this.selectedActividad = this.actividades.find(act => act.id == this.actRegistrada.idActividad);
        this.actRegistrada.tipoActividad = this.selectedActividad.descripcion;
      }
    });
  }

  onSelect(actividad:Actividad){
    this.selectedActividad = actividad;
    this.actRegistrada.idActividad = this.selectedActividad.id;
    
  }

  validate():Boolean{
    let retorno:Boolean = true;
    this.validation = "";
    if (typeof this.actRegistrada.fecha === 'undefined' || this.actRegistrada.fecha == null) {
      this.validation = "<fecha>";
      this.error = true;
      retorno = false;
    }
    if (typeof this.actRegistrada.horas === 'undefined' || this.actRegistrada.horas === null || this.actRegistrada.horas == 0) {
      this.validation += "<duración>";
      this.error = true;
      retorno = false;
    }
    
    return retorno;
  }

  goBack(): void {
    this.location.back();
  }

  guardarRegistro(){
    //debugger;
    if(!this.validate()){
      return;
    }
    if(this.id == 'new'){
      this.actRegistrada.idGrupo = this.idGrupo;
      this.registroactividadService.addRegistroActividad(this.actRegistrada)
      .subscribe(actr => {this.actRegistrada = actr; this.goBack();})
    }
    else{
      this.registroactividadService.updateRegistroActividad(this.actRegistrada)
      .subscribe(actr => {this.actRegistrada = actr; this.goBack();});
    }
  }

  constructor(
    private routeA:ActivatedRoute, 
    private actividadService:ActividadService,
    private registroactividadService:RegistroactividadService,
    private route:Router,
    private location: Location) { }

  ngOnInit() {
    this.fetchData();
  }

}
