import { Component, OnInit, Input } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from "angular2-materialize";
import { SessionPlanService } from 'src/app/data/services/session-plan.service';
import { SessionPlan } from 'src/app/data/entities/session-plan';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-session-plan-list',
  templateUrl: './session-plan-list.component.html',
  styleUrls: ['./session-plan-list.component.css']
})
export class SessionPlanListComponent implements OnInit {

  @Input() initialValue: string;
  
  sessionPlans: SessionPlan[];
  disableSessionType: boolean = false;

  constructor(private sessionPlanService: SessionPlanService,
    private toast: ToastrService,
    private router: Router,) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
      $('select').formSelect();
    });

    this.sessionPlans = [];
  }


  onSessionTypeChange(sessionType): void {
    this.sessionPlans = [];
    this.disableSessionType = true;

    //Get session plans filtered by type
    this.sessionPlanService.GetSessionPlansBySessionType(sessionType)
      .subscribe(sessionPlans => {
        if (sessionPlans.length == 0) {
          this.toast.info(`No session plans found for ${sessionType} session type.`)
        }

        this.disableSessionType = false;
        this.sessionPlans = sessionPlans;
    });
  }

  onSessionPlanChange(sessionPlan: SessionPlan): void {
    //Route to session with selected plan id
    this.router.navigate([`/sessions/session-add/0/${sessionPlan.sessionType}/${sessionPlan.id}/edit`])
  }
}