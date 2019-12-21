import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Set } from 'src/app/data/entities/activity';

@Component({
  selector: 'app-set-list, [app-set-list]',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {

  @Input() sets: Set[];
  @Output() onSaveRep = new EventEmitter();

  constructor() { }

  ngOnInit() { }
  
  orderSets(sets: Set[]): Set[] {
    return sets.sort((a,b) => a.order - b.order);
  }

  onSetChange(newSet: Set): void {
    this.onSaveRep.emit(newSet);
  }

}
