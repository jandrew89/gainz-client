import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SessionPlan } from 'src/app/data/entities/session-plan';
import { ToastrService } from 'ngx-toastr';
import { SessionPlanService } from 'src/app/data/services/session-plan.service';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { Equipment } from 'src/app/data/entities/equipment';
declare var $: any;
@Component({
  selector: 'session-plan-edit-settings',
  templateUrl: './session-plan-edit-settings.component.html',
  styleUrls: ['./session-plan-edit-settings.component.css']
})
export class SessionPlanEditSettingsComponent implements OnInit {
  @Input() sessionPlan: SessionPlan
  @Output() close = new EventEmitter();

  equipmentToAdd: Equipment[] = [];
  editMode: boolean = false;
  equipmentTitle: string;

  constructor(private toastrService: ToastrService, 
    private sessionPlanService: SessionPlanService,
    private equipmentService: EquipmentService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
    });
    this.equipmentTitle = "Session Activities"
  }

  saveSessionForm(): void {
    this.sessionPlanService.updateSessionPlan(this.sessionPlan)
      .subscribe(sessionPlan => {});
  }

  onClose = () => this.close.emit(false);

  deletePlan() {
    this.sessionPlanService.deleteSessionPlan(this.sessionPlan.id, this.sessionPlan.sessionType)
      .subscribe(isSuccess => {
        if (isSuccess) {
          this.toastrService.success('Session Plan Removed');
        }
      });
  }

  addToSessionPlan() {
    this.equipmentService.getEquipmentBySessionType(this.sessionPlan.sessionType).subscribe(
      equipment => this.equipmentToAdd = this.filterEquipment(equipment)
    )
  }

  removeSessionFromSessionPlan(equipment: Equipment) {
    // in edit mode
    if (this.editMode) {
      //remove equipment
      this.sessionPlan.equipment = this.sessionPlan.equipment.filter(f => f.id !== equipment.id);
    
      //add back into the equipment
      this.equipmentToAdd.push(equipment);
    }
  }

  addEquipmentToSessionPlan(equipment: Equipment) {

    
    //add new equipment
    this.sessionPlan.equipment.push(equipment);
    
    //refilter equipment
    this.equipmentToAdd = this.filterEquipment(this.equipmentToAdd);
  }

  private filterEquipment(equipmentList: Equipment[]): Equipment[] {
    //filter out equipment by whats already in session plan
    var alreadyInPlan = this.sessionPlan.equipment.map(m => m.id);

    //return filtered equipment
    return equipmentList.filter(f => !alreadyInPlan.includes(f.id));
  }
}
