import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Session } from '../entities/session';
import { Activity, Set } from '../entities/activity';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionUrl = environment.sessionUrl; 
  constructor(private http: HttpClient) { }

  createSession(session: Session): Observable<Session> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Session>(this.sessionUrl + 'UpsertSession', session, { headers: headers })  
      .pipe( 
        catchError(this.handleError)  
      );  
  }

  getPreviousSetsByEquipment(equpimentId: string, sessionType: string): Observable<Set[]> {
    if (equpimentId === '' || sessionType === '') { 
      //TODO: return empty reps
      
   }  

   const url = `${this.sessionUrl + 'GetPreviousSetByEquipment'}/${equpimentId}/${sessionType}`;  
   return this.http.get<Set[]>(url)
     .pipe(  
       catchError(this.handleError)  
     );  
  }

  updateSession(session: Session):Observable<Session> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.put<Session>(this.sessionUrl + 'UpsertSession', session, { headers: headers })  
      .pipe(
        catchError(this.handleError)  
      );  
  }

  updateActivity(sessionId: string, sessionType: string, activity: Activity): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.put<boolean>(this.sessionUrl + `UpsertSession/${sessionId}/${sessionType}`,activity, { headers: headers});
  }

  getSession(id: string, sessionType: string): Observable<Session> {
    if (id === '') { 
       //return empty session
    }  

    const url = `${this.sessionUrl + 'GetSession'}/${id}/${sessionType}`;  
    return this.http.get<Session>(url)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }

  getAllSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.sessionUrl + 'Get')  
      .pipe(  
        catchError(this.handleError)  
      ); 
  }

  deleteActivity(sessionId: string, activityId: string, sessionType: string): Observable<boolean> {
    const url = `${this.sessionUrl + 'DeleteActivity'}/${sessionId}/${activityId}/${sessionType}`;  

    return this.http.delete<boolean>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err) {  
    let errorMessage: string;
    debugger;
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  
}
