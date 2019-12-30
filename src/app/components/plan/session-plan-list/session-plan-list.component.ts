import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-session-plan-list',
  templateUrl: './session-plan-list.component.html',
  styleUrls: ['./session-plan-list.component.css']
})
export class SessionPlanListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('ul.tabs').tabs();
    });
  }

}
