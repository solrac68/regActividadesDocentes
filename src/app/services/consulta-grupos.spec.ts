import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { asyncData, asyncError } from '../../testing/async-observable-helpers';

import { Grupo } from '../dtos/grupo';
import { GrupoService } from './grupo.service';

import { ApiService } from './api-services.config';


describe ('Consulta Grupos (with spies)', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let grupoService: GrupoService;

    beforeEach(() => {
    // TODO: spy on other methods too
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        grupoService = new GrupoService(<any> httpClientSpy);
    });

    it('debe retornar los grupos esperados', () => {
        const listaPrueba: Grupo[] = [
            { id: 3, nombre: 'Matematica Disc 1-Grupo03', cantidadestudiantes: 20, diaclase: 'Ma-Jue', horainiclase: new Date('12:00:00'), horafinclase: new Date('14:00:00'), fechaInicio: new Date('2018-07-01'), fechaFin: new Date('2018-11-01'), estadoGrupo: true, nombreCurso: 'Matematicas Discretas 1', anoSemestre: 2018, estadoSemestre: true, semestre: true, correoDocente: 'andres@udea.edu.co', idDocente: 71701882 },
            { id: 4, nombre: 'Matematica Disc 2-Grupo03', cantidadestudiantes: 20, diaclase: 'Lu-Sab', horainiclase: new Date('16:00:00'), horafinclase: new Date('18:00:00'), fechaInicio: new Date('2018-07-01'), fechaFin: new Date('2018-11-01'), estadoGrupo: false, nombreCurso: 'Matematicas Discretas 2', anoSemestre: 2018, estadoSemestre: true, semestre: false, correoDocente: 'andres@udea.edu.co', idDocente: 71701882 },
            { id: 2, nombre: 'Matematica Disc 1-Grupo02', cantidadestudiantes: 20, diaclase: 'Lu-Mie', horainiclase: new Date('08:00:00'), horafinclase: new Date('10:00:00'), fechaInicio: new Date('2018-07-01'), fechaFin: new Date('2018-11-01'), estadoGrupo: true, nombreCurso: 'Matematicas Discretas 2', anoSemestre: 2018, estadoSemestre: true, semestre: true, correoDocente: 'andres@udea.edu.co', idDocente: 71701882 }
        ];

        httpClientSpy.get.and.returnValue(asyncData(listaPrueba));

        grupoService.getGruposByDocente(71701882).subscribe(
            grupos => expect(grupos).toEqual(listaPrueba, 'Grupos esperados'),
            fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('debe retornar un error cuando el servidor retorne 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'No Encontrado'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    grupoService.getGruposByDocente(71701882).subscribe(
        grupos => fail('se esperaba un error, no grupos'),
        error  => expect(error.message).toContain('test 404 error'),
    );
    });

});

describe('GrupoService (with mocks)', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let grupoService: GrupoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            // Import the HttpClient mocking services
            imports: [ HttpClientTestingModule ],
            // Provide the service-under-test
            providers: [ GrupoService ]
        });

        // Inject the http, test controller, and service-under-test
        // as they will be referenced by each test.
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        grupoService = TestBed.get(GrupoService);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    /// GrupoService method tests begin ///
    describe('#getGruposByDocente', () => {
        let listaPrueba: Grupo[];

        beforeEach(() => {
            grupoService = TestBed.get(GrupoService);
            listaPrueba = [
                { id: 3, nombre: 'Matematica Disc 1-Grupo03', cantidadestudiantes: 20, diaclase: 'Ma-Jue', horainiclase: new Date('12:00:00'), horafinclase: new Date('14:00:00'), fechaInicio: new Date('2018-07-01'), fechaFin: new Date('2018-11-01'), estadoGrupo: true, nombreCurso: 'Matematicas Discretas 1', anoSemestre: 2018, estadoSemestre: true, semestre: true, correoDocente: 'andres@udea.edu.co', idDocente: 71701882 },
                { id: 4, nombre: 'Matematica Disc 2-Grupo03', cantidadestudiantes: 20, diaclase: 'Lu-Sab', horainiclase: new Date('16:00:00'), horafinclase: new Date('18:00:00'), fechaInicio: new Date('2018-07-01'), fechaFin: new Date('2018-11-01'), estadoGrupo: false, nombreCurso: 'Matematicas Discretas 2', anoSemestre: 2018, estadoSemestre: true, semestre: false, correoDocente: 'andres@udea.edu.co', idDocente: 71701882 },
                { id: 2, nombre: 'Matematica Disc 1-Grupo02', cantidadestudiantes: 20, diaclase: 'Lu-Mie', horainiclase: new Date('08:00:00'), horafinclase: new Date('10:00:00'), fechaInicio: new Date('2018-07-01'), fechaFin: new Date('2018-11-01'), estadoGrupo: true, nombreCurso: 'Matematicas Discretas 2', anoSemestre: 2018, estadoSemestre: true, semestre: true, correoDocente: 'andres@udea.edu.co', idDocente: 71701882 }
            ] as Grupo[];
        });

        it('debe retornar grupos esperados (called once)', () => {
            grupoService.getGruposActivosByDocente(71701882).subscribe(
            grupos => expect(grupos).toEqual(listaPrueba, 'debe retornar grupos esperados'),
            fail
            );

            // grupoService should have made one request to GET heroes from expected URL
            //const req = httpTestingController.expectOne(grupoService.heroesUrl);
            const req = httpTestingController.expectOne(`${ApiService.API_URL_LISTAR_GRUPOSACTIVOS_DOCENTE/71701882}`);
            expect(req.request.method).toEqual('GET');

            // Respond with the mock heroes
            req.flush(listaPrueba);
        });

        it('debe aceptar lista de grupos vacios', () => {
            grupoService.getGruposActivosByDocente(71701882).subscribe(
            grupos => expect(grupos.length).toEqual(0, 'debe tener arreglo vacio de grupos'),
            fail
            );

            const req = httpTestingController.expectOne(`${ApiService.API_URL_LISTAR_GRUPOSACTIVOS_DOCENTE/71701882}`);
            req.flush([]); // Respond with no heroes
        });

        it('debe convertir error 404 a un error amigable al usuario', () => {
            const msg = 'Deliberate 404';
            grupoService.getGruposActivosByDocente(71701882).subscribe(
            grupos => fail('se espera que falle'),
            error => expect(error.message).toContain(msg)
            );

            const req = httpTestingController.expectOne(`${ApiService.API_URL_LISTAR_GRUPOSACTIVOS_DOCENTE/71701882}`);

            // respond with a 404 and the error message in the body
            req.flush(msg, {status: 404, statusText: 'No Encontrado'});
        });

        it('debe retornar grupos esperados (called multiple times)', () => {
            grupoService.getGruposActivosByDocente(71701882).subscribe();
            grupoService.getGruposActivosByDocente(71701882).subscribe();
            grupoService.getGruposActivosByDocente(71701882).subscribe(
            grupos => expect(grupos).toEqual(listaPrueba, 'debe retornar grupos esperados'),
            fail
            );

            const requests = httpTestingController.match(`${ApiService.API_URL_LISTAR_GRUPOSACTIVOS_DOCENTE/71701882}`);
            expect(requests.length).toEqual(3, 'llamados a getGruposActivosByDocente(71701882)');

            // Respond to each request with different mock hero results
            requests[0].flush([]);
            requests[1].flush([{ id: 3, nombre: 'Ingles I-Grupo04', cantidadestudiantes: 20, diaclase: 'Ma-Jue', horainiclase: new Date('12:00:00'), horafinclase: new Date('14:00:00'), fechaInicio: new Date('2018-07-01'), fechaFin: new Date('2018-11-01'), estadoGrupo: true, nombreCurso: 'Ingles I', anoSemestre: 2018, estadoSemestre: true, semestre: true, correoDocente: 'juan@udea.edu.co', idDocente: 12345 }]);
            requests[2].flush(listaPrueba);
        });
    });

    // describe('#updateHero', () => {
    // // Expecting the query form of URL so should not 404 when id not found
    // const makeUrl = (id: number) => `${grupoService.heroesUrl}/?id=${id}`;

    // it('should update a hero and return it', () => {

    //     const updateHero: Hero = { id: 1, name: 'A' };

    //     grupoService.updateHero(updateHero).subscribe(
    //     data => expect(data).toEqual(updateHero, 'should return the hero'),
    //     fail
    //     );

    //     // grupoService should have made one request to PUT hero
    //     const req = httpTestingController.expectOne(grupoService.heroesUrl);
    //     expect(req.request.method).toEqual('PUT');
    //     expect(req.request.body).toEqual(updateHero);

    //     // Expect server to return the hero after PUT
    //     const expectedResponse = new HttpResponse(
    //     { status: 200, statusText: 'OK', body: updateHero });
    //     req.event(expectedResponse);
    // });

    // it('should turn 404 error into user-facing error', () => {
    //     const msg = 'Deliberate 404';
    //     const updateHero: Hero = { id: 1, name: 'A' };
    //     grupoService.updateHero(updateHero).subscribe(
    //     heroes => fail('expected to fail'),
    //     error => expect(error.message).toContain(msg)
    //     );

    //     const req = httpTestingController.expectOne(grupoService.heroesUrl);

    //     // respond with a 404 and the error message in the body
    //     req.flush(msg, {status: 404, statusText: 'Not Found'});
    // });

    // it('should turn network error into user-facing error', () => {
    //     const emsg = 'simulated network error';

    //     const updateHero: Hero = { id: 1, name: 'A' };
    //     grupoService.updateHero(updateHero).subscribe(
    //     heroes => fail('expected to fail'),
    //     error => expect(error.message).toContain(emsg)
    //     );

    //     const req = httpTestingController.expectOne(grupoService.heroesUrl);

    //     // Create mock ErrorEvent, raised when something goes wrong at the network level.
    //     // Connection timeout, DNS error, offline, etc
    //     const errorEvent = new ErrorEvent('so sad', {
    //     message: emsg,
    //     // The rest of this is optional and not used.
    //     // Just showing that you could provide this too.
    //     filename: 'GrupoService.ts',
    //     lineno: 42,
    //     colno: 21
    //     });

    //     // Respond with mock error
    //     req.error(errorEvent);
    // });
    // });

    // TODO: test other grupoService methods
});
