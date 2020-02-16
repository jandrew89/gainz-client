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

  constructor() { 

  }

  ngOnInit(): void {
  }
}
