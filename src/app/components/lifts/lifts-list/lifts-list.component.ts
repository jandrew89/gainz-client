import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/data/entities/equipment';
import { EquipmentService } from 'src/app/data/services/equipment.service';

@Component({
  selector: 'app-lifts-list',
  templateUrl: './lifts-list.component.html',
  styleUrls: ['./lifts-list.component.css']
})
export class LiftsListComponent implements OnInit {
  pageTitle = 'Equipment List';    
  filteredListOfEquipment: Equipment[] = [];
  equipment: Equipment[] = [];
  errorMessage = '';

  displayEditEquipmentModal: boolean = false;
  equipmentToEdit: Equipment;

  _listFilter = '';

  get listFilter(): string {    
    return this._listFilter;    
  }    
  set listFilter(value: string) {    
    this._listFilter = value;    
    this.filteredListOfEquipment = this.listFilter ? this.performFilter(this.listFilter) : this.equipment;    
  }    
    
  constructor(private liftService: EquipmentService) { }


  performFilter(filterBy: string): Equipment[] {    
    filterBy = filterBy.toLocaleLowerCase();    
    return this.equipment.filter((equipment: Equipment) =>    
    equipment.name.toLocaleLowerCase().indexOf(filterBy) !== -1);    
  }

  ngOnInit(): void {
    this.equipmentToEdit = {id: '', name: '', sessionTypes: []};

    this.liftService.getEquipment().subscribe(    
       equipment => {    
        this.equipment = equipment;    
        this.filteredListOfEquipment = this.equipment;    
      },    
      error => this.errorMessage = <any>error    
    );    
  }    

  onSaveComplete(): void {    
    this.liftService.getEquipment().subscribe(    
      equipment => {    
        this.equipment = equipment;    
        this.filteredListOfEquipment = this.equipment;    
      },    
      error => this.errorMessage = <any>error    
    );    
  }

  onEquipmentClick(equipment: Equipment) {
    this.equipmentToEdit = equipment;
    this.displayEditEquipmentModal = true;
  }
}
