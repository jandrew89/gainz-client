import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Equipment } from 'src/app/data/entities/equipment';
import { SessionType } from 'src/app/data/entities/session';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  
  sessionTypes: SessionType[];

  constructor(private equipmentService: EquipmentService) { }


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
        sessionTypes: this.equipment.sessionTypes
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
      return
    }
    var sessionTypesToUpdate = this.sessionTypes.filter(type => types.some(s => s == type.id));
  
    //save updates
    this.equipmentService.updateEquipment({
      id: this.equipment.id,
      name: name,
      sessionTypes: sessionTypesToUpdate
    }).subscribe(
      isSuccesful => {
        if (isSuccesful){
          //Toastr success message
        }
      }
    )

    this.closeEquipmentEdit.emit(false);
  }

  isTypeSelected(id: string) {
    if (!this.equipment.sessionTypes) {
      return false;
    }
    return this.equipment.sessionTypes.some(st => st.id === id);
  }
}
