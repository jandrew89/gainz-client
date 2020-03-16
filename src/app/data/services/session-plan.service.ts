import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionPlan } from '../entities/session-plan';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay, share } from 'rxjs/operators';
import { Cache } from '../entities/cache-constants';

@Injectable({
  providedIn: 'root'
})
export class SessionPlanService {
  
  private cache = {};
  private sessionPlanUrl = environment.sessionPlanUrl;

  constructor(private http: HttpClient) { }

  createSessionPlan(sessionPlan: SessionPlan): Observable<SessionPlan> {
    delete this.cache[`${Cache.SessionPlans}_${sessionPlan.sessionType}`]
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<SessionPlan>(this.sessionPlanUrl + 'UpsertSessionPlan', sessionPlan, { headers: headers })  
      .pipe( 
        catchError(this.handleError)  
      );
  }

  updateSessionPlan(sessionPlan: SessionPlan): Observable<SessionPlan> {
    delete this.cache[`${Cache.SessionPlans}_${sessionPlan.sessionType}`]
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.put<SessionPlan>(this.sessionPlanUrl + 'UpsertSessionPlan', sessionPlan, { headers: headers })  
      .pipe( 
        catchError(this.handleError)  
      );
  }

  getSessionPlans(): Observable<SessionPlan[]> {
    return this.http.get<SessionPlan[]>(this.sessionPlanUrl + 'GetSessionPlans')
      .pipe(
        catchError(this.handleError)
      );
  }

  GetSessionPlanBySessionPlanId(sessionPlanId: string, sessionType: string): Observable<SessionPlan> {
    return this.http.get<SessionPlan>(this.sessionPlanUrl + `GetSessionPlanBySessionPlanId/${sessionPlanId}/${sessionType}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  GetSessionPlansBySessionType(sessionType: string): Observable<SessionPlan[]> {
    if (this.cache[`${Cache.SessionPlans}_${sessionType}`]) {
      console.log(`Return cache session plans for ${sessionType}`);
      return this.cache[`${Cache.SessionPlans}_${sessionType}`];
    }

    this.cache[`${Cache.SessionPlans}_${sessionType}`] = this.http.get<SessionPlan[]>(this.sessionPlanUrl + 'GetSessionPlansBySessionType/' + sessionType)
      .pipe(
        shareReplay(1),
        catchError(this.handleError)
      );

    return this.cache[`${Cache.SessionPlans}_${sessionType}`];
  }

  deleteSessionPlan(planId: string, sessionType: string): Observable<boolean> {
    delete this.cache[`${Cache.SessionPlans}_${sessionType}`]
    return this.http.delete<boolean>(this.sessionPlanUrl + `DeleteSessionPlan/${planId}/${sessionType}`)
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
