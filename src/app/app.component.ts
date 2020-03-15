import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-layout>  
    <spinner></spinner>
    <router-outlet></router-outlet>  
  </app-layout>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  
  title = 'gainz-limited';

  constructor() { }

  ngOnInit(): void {
  }
}
