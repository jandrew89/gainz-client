import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Set } from 'src/app/data/entities/activity';

@Component({
  selector: 'app-set-list, [app-set-list]',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.css']
})
export class SetListComponent implements OnInit {

  @Input() displayNewSet: boolean;
  @Input() sets: Set[];
  @Output() onSaveRep = new EventEmitter();

  newSet: Set

  constructor() { }

  ngOnInit() {
    this.newSet = this.emptySet();
  }

  orderSets(sets: Set[]): Set[] {
    return sets.sort((a,b) => a.order - b.order);
  }

  onSetChange(isSetUpdated: boolean): void {
    this.onSaveRep.emit(isSetUpdated);
  }

  private emptySet(): Set {
    return { order: 0, reps: null, weight: null }
  }
}
