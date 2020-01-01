import { EquipmentService } from '../data/services/equipment.service';
import { ListBase } from './list-base';
import { Equipment } from '../data/entities/equipment';
import { OnInit } from '@angular/core';

export class ListEquipmentFilterBaseClase extends ListBase {

    _listFilter = '';
    equipment: Equipment[] = [];
    filteredListOfEquipment: Equipment[] = [];
    
    constructor() { super() }

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {    
        this._listFilter = value;    
        this.filteredListOfEquipment = this.listFilter ? this.performFilter(this.listFilter) : this.equipment;    
    }

    performFilter(filterBy: string): Equipment[] {    
        filterBy = filterBy.toLocaleLowerCase();    
        return this.equipment.filter((equipment: Equipment) =>    
        equipment.name.toLocaleLowerCase().indexOf(filterBy) !== -1);    
    }
}