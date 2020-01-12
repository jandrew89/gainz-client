import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  private _loginChangedSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();

  constructor() { 
    
    const stsSettings = {
      authority: environment.stsAuthRoot,
      client_id: environment.clientId,
      redirect_uri: `${environment.rootUrl}signin-callback`,
      scope: 'openid profile projects-api',
      response_type: 'code',
      post_logout_redirect_url: `${environment.rootUrl}signout-callback`
    };

    this._userManager = new UserManager(stsSettings);
  }

  login() {
    return this._userManager.signinRedirect();
  }

  isLogginIn(): Promise<boolean> {
    return this._userManager.getUser().then(
      user => {
        const userCurrent = !!user && !user.expired;
        if (this._user !== user){
          this._loginChangedSubject.next(userCurrent);
        }
        this._user = user;
        return userCurrent;
      }
    )
  }
}
