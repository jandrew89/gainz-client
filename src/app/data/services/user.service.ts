import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { ApiBase } from 'src/app/shared/api-base';
import { catchError, shareReplay } from 'rxjs/operators';
import { Cache } from '../entities/cache-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBase {
  private cache = {};
  private url = environment.liftUrl;

  constructor(private http: HttpClient) { super() }
  
  getUser(): Observable<User> {
    if (this.cache[Cache.UserSettings]) {
      console.log("Returned user settings from cache!");
      return this.cache[Cache.UserSettings];
    }

    this.cache[Cache.UserSettings] = this.http.get<User>(this.url + 'GetUser')
      .pipe(shareReplay(1),catchError(this.handleError));

    return this.cache[Cache.UserSettings];
  }

  UpdateEnvironmentSettings(user: User): Observable<boolean> {
    delete this.cache[Cache.UserSettings];
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.put<boolean>(this.url + 'CreateOrUpdateEnvironmentSettings', user, { headers: headers })  
      .pipe( 
        catchError(this.handleError)  
      );
  }
}
