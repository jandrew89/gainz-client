import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Session } from './session';
import { Activity } from './activity';

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

  // getPreviousActitiy(equpimentId: string): Observable<Activity> {

  // }

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
