import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  
  constructor() { 
    
    const stsSettings = {
      authority: environment.stsAuthRoot,
      client_id: environment.clientId,
      redirect_url: `${environment.rootUrl}signin-callback`,
      scope: 'openid profile projects-api',
      response_type: 'code',
      post_logout_redirect_url: `${environment.rootUrl}signout-callback`
    };

    this._userManager = new UserManager(stsSettings);
  }
}
