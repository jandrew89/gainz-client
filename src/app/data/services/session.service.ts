import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { Session } from '../entities/session';
import { Activity } from '../entities/activity';
import { SetDate } from '../entities/Dtos/SetDate';
import { Cache } from '../entities/cache-constants';
import { cloneDeep } from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private cache = {};
  private sessionUrl = environment.sessionUrl; 
  constructor(private http: HttpClient) { }

  createSession(session: Session): Observable<Session> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Session>(this.sessionUrl + 'UpsertSession', session, { headers: headers })  
      .pipe( 
        catchError(this.handleError)  
      );  
  }

  getPreviousSetsByEquipment(equpimentId: string, sessionType: string): Observable<SetDate[]> {
   const url = `${this.sessionUrl + 'GetPreviousSetByEquipment'}/${equpimentId}/${sessionType}`;  
   return this.http.get<SetDate[]>(url)
     .pipe(  
       catchError(this.handleError)  
     );  
  }

  updateSession(session: Session):Observable<Session> {
    var cachedId = `${Cache.ActiveSession}_${session.id}`;

    // no active session found clear cache
    if (!this.cache[cachedId] || !this.isEqual(session, this.cache[cachedId])) {
      delete this.cache[Cache.Session];
    }

    //set cache of active session
    this.cache[cachedId] = session;
    
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
    if (this.cache[Cache.Session]) {
      console.log('Return cache session');
      return this.cache[Cache.Session];
    }
    console.log('Making the request');
    this.cache[Cache.Session] = this.http.get<Session[]>(this.sessionUrl + 'GetAllSessions')  
      .pipe(
        shareReplay(1),
        catchError(this.handleError)  
      );

    return this.cache[Cache.Session];
  }

  deleteActivity(sessionId: string, activityId: string, sessionType: string): Observable<boolean> {
    const url = `${this.sessionUrl + 'DeleteActivity'}/${sessionId}/${activityId}/${sessionType}`;  

    return this.http.delete<boolean>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteSession(sessionId: string, sessionType: string): Observable<boolean> {
    delete this.cache[Cache.Session];
    const url = `${this.sessionUrl + 'DeleteSession'}/${sessionId}/${sessionType}`;  

    return this.http.delete<boolean>(url)
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

  private isEqual(session: Session, sessionToValidate: Session): boolean {
      // deep clone so reference session activities
      // dont get deleted
      let clonedSession = cloneDeep(session);
      let clonedSessionToValidate = cloneDeep(sessionToValidate);

      // delete activities because those dont
      // warrent a clearing of cache
      delete clonedSession.activities;
      delete clonedSessionToValidate.activities;

      return clonedSession.weight == clonedSessionToValidate.weight &&
      clonedSession.sessionDate === clonedSessionToValidate.sessionDate &&
      clonedSession.sessionType === clonedSessionToValidate.sessionType;
    }
}
