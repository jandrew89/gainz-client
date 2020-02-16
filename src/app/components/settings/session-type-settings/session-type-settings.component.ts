import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { SessionType } from 'src/app/data/entities/session';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-session-type-settings',
  templateUrl: './session-type-settings.component.html',
  styleUrls: ['./session-type-settings.component.css']
})
export class SessionTypeSettingsComponent implements OnInit {

  constructor(private equipmentService: EquipmentService, private toastr: ToastrService) { }

  sessionTypes: SessionType[]
  pageTitle: string;
  addMode: boolean = false;
  sessionTypeToAdd: string;
  canAddSession: boolean = true;;

  ngOnInit() {
    this.pageTitle = "Session Types";
    //get all session types
    this.equipmentService.getSessionTypes().subscribe(types => {
      this.sessionTypes = types;
    });
  }

  addNewSessionType() {
    this.addMode = true;
  }

  saveSessionType() {
    //validate not null
    if (this.sessionTypeToAdd == '' || this.sessionTypeToAdd == null) {
      this.toastr.error('Must enter a session type value.');
      return false;
    }

    //validate doesnt already exists
    if (this.sessionTypes.find(f => f.name == this.sessionTypeToAdd) != null) {
      this.toastr.error('Session Type already exists.');
      return false;
    }

    this.canAddSession = false;

    this.equipmentService.insertSessionType({id: '', name: this.sessionTypeToAdd}).subscribe(
      type => {
        this.toastr.info('Session Added');
        this.sessionTypes.push(type);
        this.sessionTypeToAdd = '';
        this.canAddSession = true;
      });
  }

  removeSessionType(type: SessionType) {
    this.sessionTypes = this.sessionTypes.filter(f => f.id !== type.id);

    this.equipmentService.deleteSessionType(type).subscribe(
      isSuccessful => {
        if (isSuccessful) {
          this.toastr.success('Removed session type!');
        }
      }
    )
  }
}
