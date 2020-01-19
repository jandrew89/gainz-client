import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/data/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin-callback',
    template: `<div></div>`
})
export class SignInRedirectCallbackComponent implements OnInit {
    constructor(private _authService: AuthService,
        private _router: Router) {}

    ngOnInit() {    
        this._authService.completeLogin().then(user => {
        this._router.navigate(['/sessions'], { replaceUrl: true })
      })}
}