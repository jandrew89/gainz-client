import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Equipment } from '../entities/equipment';
import { catchError } from 'rxjs/operators';
import { SessionType } from '../entities/session';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private url = environment.liftUrl; 
  constructor(private http: HttpClient) { }

  getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.url + 'Get')
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

  private handleError(err) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  
}
