import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../entities/equipment';
import { catchError, shareReplay } from 'rxjs/operators';
import { SessionType } from '../entities/session';
import { ApiBase } from 'src/app/shared/api-base';
import { Cache } from '../entities/cache-constants';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends ApiBase {

  cache = {};
  private url = environment.liftUrl; 
  constructor(private http: HttpClient) { super() }

  getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.url + 'Get')
      .pipe(catchError(this.handleError));
  }

  getEquipmentBySessionType(sessionType: string): Observable<Equipment[]> {
    const url = `${this.url}GetEquipmentBySessionType/${sessionType}`;
    return this.http.get<Equipment[]>(url)
      .pipe(catchError(this.handleError));
  }

  getEqupimentByName(name: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.url + 'Get'}/${name}`)
      .pipe(catchError(this.handleError));
  }

  getSessionTypes(): Observable<SessionType[]>{
    if (this.cache[Cache.SessionTypes]) {
      console.log('Returning cache session types');
      return this.cache[Cache.SessionTypes];
    }
    console.log('Do the request again');

    this.cache[Cache.SessionTypes] = this.http.get<SessionType[]>(this.url + 'GetSessionTypes')
      .pipe(shareReplay(1),
            catchError(this.handleError));

    return this.cache[Cache.SessionTypes];
  }

  deleteSessionType(type: SessionType): Observable<boolean> {
    //delete cache
    delete this.cache[Cache.SessionTypes];
    return this.http.delete<boolean>(`${this.url}DeleteSessionType/${type.id}/${type.name}`)
      .pipe(catchError(this.handleError));
  }

  insertSessionType(sessionType: SessionType): Observable<SessionType> {
    delete this.cache[Cache.SessionTypes];
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SessionType>(this.url + 'CreateOrUpdateSessionType', sessionType, { headers: headers })  
      .pipe( 
        catchError(this.handleError)  
      );
  }

  createEquipment(equipment: Equipment): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<boolean>(this.url + 'CreateOrUpdate', equipment, { headers: headers })  
      .pipe( 
        catchError(this.handleError)  
      );  
  }

  updateEquipment(equipment: Equipment): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.put<boolean>(this.url + 'CreateOrUpdate', equipment, { headers: headers })  
      .pipe( 
        catchError(this.handleError)  
      );  
  }
}
