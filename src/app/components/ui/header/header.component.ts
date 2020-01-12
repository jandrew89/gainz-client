import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(private authService: AuthService) { 
    this.authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.sidenav').sidenav({
        closeOnClick: true 
      }).on('click tap', 'li a', () => {
        $('.sidenav').sidenav('close');
      });
    });
    
    this.authService.isLogginIn().then(loggin => {
      this.isLoggedIn = loggin;
    })
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
