import { async, inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { GrupoService } from './grupo.service';

describe('Prueba para Consulta de Grupos', ()=> {
    
    describe('Prueba Consultar Todos los Grupos', ()=> {

        it('debe retornar objeto JSON', async(()=> {
            //Arrange
            const service: GrupoService = TestBed.get(GrupoService);
            //let listaGrupos = new GrupoService();
            
            //Act
            service.getGruposByDocente(71701882).subscribe(
                (response) => expect(response.json).not.toBeNull(),
                (error) => fail(error)
            );
            //let resultado = listaGrupos.getGruposByDocente(71701882);
            
            //Assert
            //expect(resultado).toContain
        }));

        
        it ('should get users', async(() => {
            const service: ListUsersProxyService = TestBed.get(ListUsersProxyService);
            service.getUsers().subscribe(
              (response) => expect(response.json()).not.toBeNull(),
              (error) => fail(error)
            );
          }));


    });

    describe('Prueba Consultar Grupos Activos', ()=> {

        it('debe retornar ', ()=> {

        });
    });

});