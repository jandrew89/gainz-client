import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.sidenav').sidenav({
        closeOnClick: true 
      }).on('click tap', 'li a', () => {
        $('.sidenav').sidenav('close');
      });
    });
  }
}
