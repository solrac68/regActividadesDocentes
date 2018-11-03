import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

//import { json } from 'rxjs';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


//import { HttpClientModule} from '@angular/common/http';

import { GrupoService } from './grupo.service';



describe('Consulta de Grupos', ()=> {
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                //HttpModule,
                HttpClientTestingModule
            ],
            providers: [GrupoService]
        });
    });

    describe('Todos los Grupos', ()=> {

        it('debe retornar objeto JSON', async(()=> {
            //Arrange
            const service: GrupoService = TestBed.get(GrupoService);
            //let listaGrupos = new GrupoService().getGruposByDocente;
            
            //Act
            service.getGruposByDocente(12433442134132412343142).subscribe(
                (response) => expect(response).not.toBeNull(),
                (error) => fail(error)
            );
            //let resultado = listaGrupos.getGruposByDocente(71701882);
            
            //Assert
            //expect(resultado).toContain
        }));

        
        // it ('should get users', async(() => {
        //     const service: ListUsersProxyService = TestBed.get(ListUsersProxyService);
        //     service.getUsers().subscribe(
        //       (response) => expect(response.json()).not.toBeNull(),
        //       (error) => fail(error)
        //     );
        //   }));


    });

    // describe('Prueba Consultar Grupos Activos', ()=> {

    //     it('debe retornar ', ()=> {

    //     });
    // });

});