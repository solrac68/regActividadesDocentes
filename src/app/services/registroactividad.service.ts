import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from './api-services.config';
import {ActividadRegistrada} from '../dtos/actividadRegistrada';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RegistroactividadService {

  constructor(private http:HttpClient) { }

  getRegistroActividadByGrupo(id:number):Observable<ActividadRegistrada[]>{
    const url = `${ApiService.API_URL_LISTAR_REGISTROACTIVIDADPORGRUPO}/${id}`;
    return this.http.get<ActividadRegistrada[]>(url)
    .pipe(
        catchError(this.handleError('getRegistroActividadByGrupo', []))
    );
  }

  deleteRegistroActividad (id: number): Observable<ActividadRegistrada> {
    const url = `${ApiService.API_URL_DELETE_REGISTROACTIVIDAD}/${id}`;

    return this.http.delete<ActividadRegistrada>(url, httpOptions).pipe(
      catchError(this.handleError<ActividadRegistrada>('deleteRegistroActividadByGrupo'))
    );
  }

  addRegistroActividad (actividadRegistrada: ActividadRegistrada): Observable<ActividadRegistrada> {
    const url = `${ApiService.API_URL_INSERT_REGISTROACTIVIDAD}`;

    return this.http.post<ActividadRegistrada>(url,actividadRegistrada,httpOptions).pipe(
      catchError(this.handleError<ActividadRegistrada>('addRegistroActividadByGrupo'))
    );
  }

  updateRegistroActividad (actividadRegistrada: ActividadRegistrada): Observable<ActividadRegistrada> {
    const url = `${ApiService.API_URL_UPDATE_REGISTROACTIVIDAD}`;

    return this.http.put<ActividadRegistrada>(url,actividadRegistrada, httpOptions).pipe(
      catchError(this.handleError<ActividadRegistrada>('updateRegistroActividad'))
    );
  }


  getSumaActividadesByGrupo(id:number):Observable<any>{
    const url = `${ApiService.API_URL_SUMAHORAS_ACTIVIDADESPORGRUPO}/${id}`;
    return this.http.get<any>(url)
    .pipe(
        catchError(this.handleError('getSumaActividadesByGrupo'))
    );
  }

  getRegistroActividad(id:number):Observable<ActividadRegistrada>{
    const url = `${ApiService.API_URL_GET_REGISTROACTIVIDAD}/${id}`;
    return this.http.get<ActividadRegistrada>(url)
    .pipe(
        catchError(this.handleError<ActividadRegistrada>('getRegistroActividadBy'))
    );
  }

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
