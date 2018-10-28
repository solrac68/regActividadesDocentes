import { Component, OnInit } from '@angular/core';
import {Grupo} from '../dtos/grupo';
import {GrupoService} from '../services/grupo.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  consulta:any = null;
  grupoList: Grupo[];

  constructor(private grupoService:GrupoService) { }

  ngOnInit() {
    this.grupoService.getGruposActivosByDocente(71701882)
      .subscribe(grupos => this.grupoList = grupos);
  }

  eliminarGrupo(grupo){
    //debugger;
    //this.productService.deleteProducto(producto);
  }

}
