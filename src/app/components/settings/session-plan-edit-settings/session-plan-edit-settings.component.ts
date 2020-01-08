import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SessionPlan } from 'src/app/data/entities/session-plan';
import { ToastrService } from 'ngx-toastr';
import { SessionPlanService } from 'src/app/data/services/session-plan.service';
declare var $: any;
@Component({
  selector: 'app-session-plan-edit-settings',
  templateUrl: './session-plan-edit-settings.component.html',
  styleUrls: ['./session-plan-edit-settings.component.css']
})
export class SessionPlanEditSettingsComponent implements OnInit {
  @Input() displaySessionPlanModal: boolean
  @Input() sessionPlan: SessionPlan
  @Output() closePlanEdit = new EventEmitter();

  constructor(private toastrService: ToastrService, private sessionPlanService: SessionPlanService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  saveSessionForm(): void {
    this.sessionPlanService.updateSessionPlan(this.sessionPlan)
      .subscribe(sessionPlan => {
        console.log(sessionPlan);
      });
  }

  onClose(): void {
    this.closePlanEdit.emit(false);
  }

  deletePlan() {
    console.log('delete')
  }
}
