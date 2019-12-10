import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Equipment } from 'src/app/data/entities/equipment';
import { SessionType } from 'src/app/data/entities/session';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {

  @Input() displayEquipmentModal: boolean
  @Input() equipment: Equipment;
  @Input() sessionTypes: SessionType[];
  @Output() closeEquipmentEdit = new EventEmitter();

  constructor() { }


  ngOnInit() {
  }


  onClose(): void {
    this.closeEquipmentEdit.emit(false);
  }

  saveChanges(): void {
    
  }
}
