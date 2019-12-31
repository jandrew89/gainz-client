import { Component, OnInit, Input } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from "angular2-materialize";
import { SessionPlanService } from 'src/app/data/services/session-plan.service';
import { SessionPlan } from 'src/app/data/entities/session-plan';
declare var $: any;

@Component({
  selector: 'app-session-plan-list',
  templateUrl: './session-plan-list.component.html',
  styleUrls: ['./session-plan-list.component.css']
})
export class SessionPlanListComponent implements OnInit {

  @Input() initialValue: string;
  
  sessionPlans: SessionPlan[];

  constructor(private sessionPlanService: SessionPlanService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
      $('select').formSelect();
    });

    this.sessionPlans = [];
  }


  onSessionTypeChange(sessionType): void {
    console.log(sessionType);
    //Get session plans filtered by type
    this.sessionPlanService.GetSessionPlansBySessionType(sessionType)
      .subscribe(sessionPlans => {
        console.log('sessionplans', sessionPlans);
        this.sessionPlans = sessionPlans;
    });
  }

  onSessionPlanChange(sessionPlan): void {
    console.log(sessionPlan);
  }
}
