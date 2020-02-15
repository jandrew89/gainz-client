import { Component, OnInit, Input } from '@angular/core';
import { SessionType } from 'src/app/data/entities/session';
import { SessionPlanService } from 'src/app/data/services/session-plan.service';
import { SessionPlan } from 'src/app/data/entities/session-plan';
import { Router } from '@angular/router';

@Component({
  selector: 'session-plan-list-detail',
  templateUrl: './session-plan-list-detail.component.html',
  styleUrls: ['./session-plan-list-detail.component.css']
})
export class SessionPlanListDetailComponent implements OnInit {

  @Input() sessionType: SessionType

  sessionPlans: SessionPlan[]

  constructor(private sessionPlanService: SessionPlanService,
    private router: Router) { }

  ngOnInit() {

    this.sessionPlanService.GetSessionPlansBySessionType(this.sessionType.name)
      .subscribe(sessionPlans => {
        if (sessionPlans.length == 0) {
          //this.toast.info(`No session plans found for ${sessionType} session type.`)
        }
        //this.disableSessionType = false;
        this.sessionPlans = sessionPlans;
    });
  }


  onSessionPlanChange(sessionPlan: SessionPlan): void {
    //Route to session with selected plan id
    this.router.navigate([`/sessions/session-add/0/${sessionPlan.sessionType}/${sessionPlan.id}/edit`])
  }
}
