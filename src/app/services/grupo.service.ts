import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from './api-services.config';
import {Grupo} from '../dtos/grupo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class GrupoService{
  constructor(private http:HttpClient){}

  getGruposByDocente(id:number):Observable<Grupo[]>{
      const url = `${ApiService.API_URL_LISTAR_GRUPOS_DOCENTE}/${id}`;
      return this.http.get<Grupo[]>(url)
      .pipe(
          catchError(this.handleError('getGruposByDocente', []))
      );

  }

  getGruposActivosByDocente(id:number):Observable<Grupo[]>{
      const url = `${ApiService.API_URL_LISTAR_GRUPOSACTIVOS_DOCENTE}/${id}`;
      return this.http.get<Grupo[]>(url)
      .pipe(
          catchError(this.handleError('getGruposActivosByDocente', []))
      );

  }


//     /**
//    * Handle Http operation that failed.
//    * Let the app continue.
//    * @param operation - name of the operation that failed
//    * @param result - optional value to return as the observable result
//    */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** Log a HeroService message with the MessageService */
private log(message: string) {
  //this.messageService.add(`HeroService: ${message}`);
  console.log(message);
}
}
