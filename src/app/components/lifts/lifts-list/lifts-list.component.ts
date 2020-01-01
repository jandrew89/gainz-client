import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/data/entities/equipment';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { ListEquipmentFilterBaseClase } from 'src/app/shared/list-filter-base';

@Component({
  selector: 'app-lifts-list',
  templateUrl: './lifts-list.component.html',
  styleUrls: ['./lifts-list.component.css']
})
export class LiftsListComponent extends ListEquipmentFilterBaseClase implements OnInit {
  pageTitle = 'Equipment List';    
  errorMessage = '';

  displayEditEquipmentModal: boolean = false;
  equipmentToEdit: Equipment;
    
  constructor(private equipmentService: EquipmentService) { super() }

  ngOnInit(): void {
    this.equipmentToEdit = {id: '', name: '', sessionTypes: []};

    this.equipmentService.getEquipment().subscribe(    
       equipment => {    
        this.equipment = equipment;    
        this.filteredListOfEquipment = this.equipment;    
      },    
      error => this.errorMessage = <any>error    
    );    
  }    

  onSaveComplete(): void {    
    this.equipmentService.getEquipment().subscribe(    
      equipment => {    
        this.equipment = equipment;    
        this.filteredListOfEquipment = this.equipment;    
      },    
      error => this.errorMessage = <any>error    
    );    
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
  }
}
