import { Component, OnInit } from '@angular/core';
import { AuthService } from './data/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <app-layout>  
    <router-outlet></router-outlet>  
  </app-layout>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  
  title = 'gainz-limited';
  isLoggedIn = false;

  constructor(private _authService: AuthService) { 
    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
  }

  ngOnInit(): void {
    this._authService.isLogginIn().then(loggin => {
      this.isLoggedIn = loggin;
    })
  }
}
