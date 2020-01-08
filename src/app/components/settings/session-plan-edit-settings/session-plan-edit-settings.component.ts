import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SessionPlan } from 'src/app/data/entities/session-plan';
import { FormGroup, FormControl } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-session-plan-edit-settings',
  templateUrl: './session-plan-edit-settings.component.html',
  styleUrls: ['./session-plan-edit-settings.component.css']
})
export class SessionPlanEditSettingsComponent implements OnInit, OnChanges {
  @Input() displaySessionPlanModal: boolean
  @Input() sessionPlan: SessionPlan
  @Output() closePlanEdit = new EventEmitter();

  sessionPlanForm = new FormGroup({
    sessionPlanName: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
    });

    this.sessionPlanForm.patchValue({
      sessionPlanName: this.sessionPlan.sessionPlanName
    });
  }

  ngOnChanges(changes: any): void {
    this.sessionPlanForm.patchValue({
      sessionPlanName: this.sessionPlan.sessionPlanName
    });
  }
}
