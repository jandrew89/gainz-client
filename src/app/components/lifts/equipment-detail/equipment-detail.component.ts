import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Equipment } from 'src/app/data/entities/equipment';
import { SessionType } from 'src/app/data/entities/session';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit, OnChanges {

  @Input() displayEquipmentModal: boolean
  @Input() equipment: Equipment;
  @Output() closeEquipmentEdit = new EventEmitter();

  equipmentForm = new FormGroup({
    name: new FormControl('')
  });

  lockForm: boolean = false;
  sessionTypes: SessionType[];
  activeSessionTypes: SessionType[];

  constructor(private equipmentService: EquipmentService, private toastrService: ToastrService) { }


  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
    });

    this.activeSessionTypes = [];
    this.equipmentService.getSessionTypes().subscribe(
      sessionTypes =>  { 
        this.sessionTypes = sessionTypes;
      }
    )
  }

  ngOnChanges(changes: any): void {
      this.equipmentForm.patchValue({
        name: this.equipment.name
      });

      if (this.equipment && this.equipment.id && this.equipment.id !== '0') 
        this.equipmentForm.disable()
      else
        this.equipmentForm.enable()
  }


  onClose(): void {
    this.closeEquipmentEdit.emit(false);
  }

  onSessionTypeClick(e, sessionType: SessionType) {
    const addToType: boolean = e.target.checked;

    //If checked, add to active sessions
    if (addToType) 
      this.activeSessionTypes.push(sessionType);

    //else remove from active sesssions
    if (!addToType)
      this.activeSessionTypes = this.activeSessionTypes.filter(f => f.id !== sessionType.id);
  }

  saveEquipmentForm(): void {

    var name = this.equipmentForm.controls['name'].value
    
    if (name === null || name === '') {
      //TODO: Validation error
      this.toastrService.error('Must have name.')
      return
    }

    this.lockForm = true;
  
    if (this.equipment.id == '0') {
      this.equipmentService.createEquipment({
        id: this.equipment.id,
        name: name,
        sessionTypes: this.activeSessionTypes
      }).subscribe(
        isSuccesful => {
          if (isSuccesful){
            //Toastr success message
            this.toastrService.success('Successfully added the equipment!');
            this.lockForm = false;
          }
        }
      )
    } else {
      this.equipmentService.updateEquipment({
        id: this.equipment.id,
        name: name,
        sessionTypes: this.activeSessionTypes
      }).subscribe(
        isSuccesful => {
          if (isSuccesful){
            //Toastr success message
            this.toastrService.success('Successfully updated the equipment!')
            this.lockForm = false;
          }
        }
      )
    }

    this.closeEquipmentEdit.emit(false);
  }

  isSessionSelected(id: string) {
    if (!this.equipment.sessionTypes) {
      return false;
    }

    // add previous loaded session types to active session types
    var activeSession = this.equipment.sessionTypes.find(f => f.id === id);
    if (activeSession) {
      if (!this.activeSessionTypes.includes(activeSession))
        this.activeSessionTypes.push(activeSession)
      return true;
    }

    return false;
  }
}
