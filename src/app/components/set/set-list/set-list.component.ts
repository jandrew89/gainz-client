import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Set } from 'src/app/data/entities/activity';

@Component({
  selector: 'app-set-list',
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

  onSaveSet(): void {
    if (this.newSet.reps === null || this.newSet.weight === null) {
      //TODO display error
      return;
    }

    if (this.sets == null) {
      this.sets = [];
    }

    this.sets.forEach(set => {
      set.order = set.order + 1;
    });

    this.sets.unshift(this.newSet);

    this.onSaveRep.emit(this.sets);
    this.newSet = this.emptySet();
  }

  private emptySet(): Set {
    return { order: 0, reps: null, weight: null }
  }
}
