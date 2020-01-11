import { Component, OnInit } from '@angular/core';
import { ListFilterBaseClass } from 'src/app/shared/list-filter-base';
import { SessionPlanDto, SessionPlan } from 'src/app/data/entities/session-plan';
import { SessionPlanService } from 'src/app/data/services/session-plan.service';

@Component({
  selector: 'app-session-plan-settings',
  templateUrl: './session-plan-settings.component.html',
  styleUrls: ['./session-plan-settings.component.css']
})
export class SessionPlanSettingsComponent extends ListFilterBaseClass<SessionPlan> implements OnInit {
  pageTitle = 'Session Plan List';
  planToEdit: SessionPlan;
 
  constructor(private sessionPlanService: SessionPlanService) { super() }

  ngOnInit() {
    this._propToFilter = 'sessionPlanName';

    this.planToEdit = { id: '', equipment: [], sessionPlanName: '', sessionType: '' }

    this.sessionPlanService.getSessionPlans().subscribe(
      sessionPlans => {
        this.unfilteredList = sessionPlans;
        this.filteredListOfItems = this.unfilteredList;
      }
    )
  }

  onPlanClick(sessionPlan: SessionPlan) {
    this.planToEdit = sessionPlan;
  }
}
