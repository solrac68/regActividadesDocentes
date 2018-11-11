import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ActividadService} from '../services/actividad.service';
import {RegistroactividadService} from '../services/registroactividad.service';
import {ActividadRegistrada} from '../dtos/actividadRegistrada';
import {Actividad} from '../dtos/actividad';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-actividad-registrada',
  templateUrl: './detalle-actividad-registrada.component.html',
  styleUrls: ['./detalle-actividad-registrada.component.css']
})
export class DetalleActividadRegistradaComponent implements OnInit {

  actRegistrada:ActividadRegistrada;
  actividades:Actividad[];
  selectedActividad:Actividad;
  id:any = null;
  idGrupo:any = null;

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
    });
  }

  onSelect(actividad:Actividad){
    this.selectedActividad = actividad;
    this.actRegistrada.idActividad = this.selectedActividad.id;
  }

  guardarRegistro(){
    if(this.id == 'new'){
      this.registroactividadService.addRegistroActividad(this.actRegistrada)
      .subscribe(actr => this.actRegistrada = actr)
    }
    else{
      this.registroactividadService.updateRegistroActividad(this.actRegistrada)
      .subscribe(actr => this.actRegistrada = actr)
    }
    this.route.navigate([`/actividades/${this.actRegistrada.idGrupo}`]);
  }

  constructor(
    private routeA:ActivatedRoute, 
    private actividadService:ActividadService,
    private registroactividadService:RegistroactividadService,
    private route:Router) { }

  ngOnInit() {
    this.fetchData();
  }

}
