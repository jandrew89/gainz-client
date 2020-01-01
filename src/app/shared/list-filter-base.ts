import { ListBase } from './list-base';

export class ListFilterBaseClase<T> extends ListBase {

    _listFilter = '';
    _propToFilter: string = 'name'; //default to name
    unfilteredList: T[] = [];
    filteredListOfItems: T[] = [];

    constructor() { super() }

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredListOfItems = this.listFilter ? this.performFilter(this.listFilter, this._propToFilter) : this.unfilteredList;    
    }

    private performFilter(filterBy: string, filterProp: string): T[] {    
        filterBy = filterBy.toLocaleLowerCase();    
        return this.unfilteredList.filter((item: T) =>    
            item[filterProp].toLocaleLowerCase().indexOf(filterBy) !== -1);    
    }
}