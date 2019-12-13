import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Equipment } from 'src/app/data/entities/equipment';
import { SessionType } from 'src/app/data/entities/session';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    name: new FormControl(''),
    sessionTypes: new FormControl('')
  });
  lockForm: boolean = false;
  sessionTypes: SessionType[];

  constructor(private equipmentService: EquipmentService, private toastrService: ToastrService) { }


  ngOnInit() {
    this.equipmentService.getSessionTypes().subscribe(
      sessionTypes =>  { 
        this.sessionTypes = sessionTypes;
      }
    )
  }

  ngOnChanges(changes: any): void {
      this.equipmentForm.patchValue({
        name: this.equipment.name,
        sessionTypes: this.equipment.sessionTypes == null ? [] : this.equipment.sessionTypes.map(s => s.id)
      });
  }


  onClose(): void {
    this.closeEquipmentEdit.emit(false);
  }

  saveEquipmentForm(): void {

    var name = this.equipmentForm.controls['name'].value
    var types = this.equipmentForm.controls['sessionTypes'].value as []

    if (name === null || types === null) {
      //TODO: Validation error
      this.toastrService.error('Must add name and session type.')
      return
    }

    this.lockForm = true;
    var sessionTypesToUpdate = this.sessionTypes.filter(type => types.some(s => s == type.id));
  
    if (this.equipment.id == '0') {
      this.equipmentService.createEquipment({
        id: this.equipment.id,
        name: name,
        sessionTypes: sessionTypesToUpdate
      }).subscribe(
        isSuccesful => {
          if (isSuccesful){
            //Toastr success message
            this.toastrService.success('Successfully updated the equipment!')
            this.lockForm = false;
          }
        }
      )
    } else {
      this.equipmentService.updateEquipment({
        id: this.equipment.id,
        name: name,
        sessionTypes: sessionTypesToUpdate
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

  isTypeSelected(id: string) {
    if (!this.equipment.sessionTypes) {
      return false;
    }
    return this.equipment.sessionTypes.some(st => st.id === id);
  }
}
