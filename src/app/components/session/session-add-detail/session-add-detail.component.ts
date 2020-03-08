import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { SessionType, Session } from 'src/app/data/entities/session';
declare var $: any;

@Component({
  selector: 'session-add-detail',
  templateUrl: './session-add-detail.component.html',
  styleUrls: ['./session-add-detail.component.css']
})
export class SessionAddDetailComponent implements OnInit {


  @Input() session: Session;
  @Output() onSessionChange = new EventEmitter()

  sessionTypes: SessionType[] = [];
  isOpenSessionType: boolean = true;

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit() {
    this.equipmentService.getSessionTypes().subscribe(
      sessionTypes => {
        this.sessionTypes = sessionTypes;
        this.setSessionType();
      }
    )
  }

  setSessionType() {
    // If session passed in.. set it
    if (this.session.sessionType) 
        this.isOpenSessionType = false;
  }

  onSessionUpdate(): void {
     this.onSessionChange.emit(this.session);
  }

  setActiveSessionType(type: SessionType) {
    if (this.isOpenSessionType && this.session.id == '0') {
      // remove the old session
        if (this.session.sessionType) {
          $(`#${this.session.sessionType}`).removeClass('active');
        }
        // set the active session
        this.session.sessionType = type.name;

        //update the form
        this.onSessionUpdate();
        // add the class to the active session
        $(`#${this.session.sessionType}`).addClass('active');
    }
  }
}
