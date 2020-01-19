import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Equipment } from '../entities/equipment';
import { catchError } from 'rxjs/operators';
import { SessionType } from '../entities/session';
import { ApiBase } from 'src/app/shared/api-base';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends ApiBase {
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
    return this.http.get<SessionType[]>(this.url + 'GetSessionTypes')
      .pipe(catchError(this.handleError));
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
