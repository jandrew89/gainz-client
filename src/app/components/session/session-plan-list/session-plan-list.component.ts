import { Component, OnInit, Input } from '@angular/core';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { SessionType } from 'src/app/data/entities/session';
import { SessionPlanService } from 'src/app/data/services/session-plan.service';
import { SessionPlan } from 'src/app/data/entities/session-plan';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-session-plan-list',
  templateUrl: './session-plan-list.component.html',
  styleUrls: ['./session-plan-list.component.css']
})
export class SessionPlanListComponent implements OnInit {

  @Input() initialValue: string;
  
  sessionTypes: SessionType[] = [];
  selectedSessionType: SessionType;
  sessionPlansToDisplay: SessionPlan[] = [];
  test = false;
  constructor(private equipmentService: EquipmentService, 
    private sessionPlanService: SessionPlanService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.selectedSessionType = null;
    $(document).ready(function(){
      $('.modal').modal();
      $('.collapsible').collapsible();
    });

    this.equipmentService.getSessionTypes().subscribe(types => {
      this.sessionTypes = types;
    });
  }

  onSessionTypeChange(sessionType): void {
    this.sessionPlansToDisplay = [];
    this.sessionPlanService.GetSessionPlansBySessionType(sessionType.name)
      .subscribe(sessionPlans => {
          if (sessionPlans.length == 0) {
            this.toastr.info(`No session plans found for ${sessionType.name} session type.`)
          }
          //
          this.sessionPlansToDisplay = sessionPlans;
          this.test = true
  });
  }
}
