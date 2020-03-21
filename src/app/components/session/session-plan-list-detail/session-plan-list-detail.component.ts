import { Component, OnInit, Input } from '@angular/core';
import { SessionPlan } from 'src/app/data/entities/session-plan';
import { Router } from '@angular/router';

@Component({
  selector: 'session-plan-list-detail',
  templateUrl: './session-plan-list-detail.component.html',
  styleUrls: ['./session-plan-list-detail.component.css']
})
export class SessionPlanListDetailComponent implements OnInit {

  @Input() sessionPlans: SessionPlan[]

  constructor(private router: Router) { }

  ngOnInit() {

  }

  onSessionPlanChange(sessionPlan: SessionPlan): void {
    //Route to session with selected plan id
    this.router.navigate([`/sessions/session-add/0/${sessionPlan.sessionType}/${sessionPlan.id}/edit`])
  }
}
