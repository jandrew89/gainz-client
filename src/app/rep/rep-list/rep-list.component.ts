import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Set, Activity, ActivityViewModel } from 'src/app/data/activity';

@Component({
  selector: 'app-rep-list',
  templateUrl: './rep-list.component.html',
  styleUrls: ['./rep-list.component.css']
})
export class RepListComponent implements OnInit {

  @Input() addNewSet: boolean;
  @Input() activity: ActivityViewModel;
  @Output() activityOutput = new EventEmitter();
  set: Set

  constructor() { }

  ngOnInit() {
    this.set = this.emptySet();
  }

  onSaveSet(): void {
    if (this.set.reps === null || this.set.weight === null) {
      return;
    }

    if (this.activity.sets == null) {
      this.activity.sets = [];
    }
    this.activity.sets.forEach(set => {
      set.order = set.order + 1;
    });
    this.activity.sets.unshift(this.set);
    this.activity.displayNewSet = false;
    this.activityOutput.emit(this.activity);
    this.set = this.emptySet();
  }

  private emptySet(): Set {
    return { order: 0, reps: null, weight: null }
  }
}
