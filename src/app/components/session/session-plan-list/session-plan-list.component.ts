import { Component, OnInit, Input } from '@angular/core';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { SessionType } from 'src/app/data/entities/session';
declare var $: any;

@Component({
  selector: 'app-session-plan-list',
  templateUrl: './session-plan-list.component.html',
  styleUrls: ['./session-plan-list.component.css']
})
export class SessionPlanListComponent implements OnInit {

  @Input() initialValue: string;
  
  sessionTypes: SessionType[];
  selectedSessionType: SessionType;

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
      $('.collapsible').collapsible();
    });

    this.equipmentService.getSessionTypes().subscribe(types => {
      this.sessionTypes = types;
    });
  }


  onSessionTypeChange(sessionType): void {
    this.selectedSessionType = sessionType;
  }
}
