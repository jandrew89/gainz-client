import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/data/entities/equipment';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { ListFilterBaseClass } from 'src/app/shared/list-filter-base';
import { SessionType } from 'src/app/data/entities/session';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lifts-list',
  templateUrl: './lifts-list.component.html',
  styleUrls: ['./lifts-list.component.css']
})
export class LiftsListComponent extends ListFilterBaseClass<Equipment> implements OnInit {
  
  pageTitle = 'Equipment List';    
  errorMessage = '';
  display = true;
  displayEditEquipmentModal: boolean = false;
  equipmentToEdit: Equipment;
  sessionTypes: SessionType[];

  constructor(private equipmentService: EquipmentService) { super() }

  ngOnInit(): void {

    this.equipmentToEdit = {id: '', name: '', sessionTypes: []};

    forkJoin(
      this.equipmentService.getEquipment(),
      this.equipmentService.getSessionTypes()
    ).subscribe(([equipment, sessionTypes]) =>{
      this.unfilteredList = equipment;
      this.filteredListOfItems = this.unfilteredList;
      this.sessionTypes = sessionTypes;
    });
  }

  addNewEquipment(): void {
    this.equipmentToEdit = {
      id: '0',
      name: '',
      sessionTypes: []
    }
  }

  onEquipmentClick(equipment: Equipment) {
    this.equipmentToEdit = equipment;
    this.displayEditEquipmentModal = true;
  }
}
