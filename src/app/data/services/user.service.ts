import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { ApiBase } from 'src/app/shared/api-base';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBase {
  private url = environment.liftUrl;

  constructor(private http: HttpClient) { super() }
  
  getUser(): Observable<User> {
    return this.http.get<User>(this.url + 'GetUser')
      .pipe(catchError(this.handleError));
  }

  UpdateEnvironmentSettings(user: User): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.put<boolean>(this.url + 'CreateOrUpdateEnvironmentSettings', user, { headers: headers })  
      .pipe( 
        catchError(this.handleError)  
      );
  }
}
