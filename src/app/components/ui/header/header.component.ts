import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/data/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.sidenav').sidenav({
        closeOnClick: true 
      }).on('click tap', 'li a', () => {
        $('.sidenav').sidenav('close');
      });
    });
  }

  login() {
    this.authService.login();
  }
}
