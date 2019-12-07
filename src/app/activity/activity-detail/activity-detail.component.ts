import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/data/activity';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

  @Input() activity: Activity

  displayNewSet = false;
  constructor() { }

  ngOnInit() {
  }

  onAddSet() {
    //Save all reps and activity data add new rep input
    //display a new set
    this.displayNewSet = true;

    //
  }


  onSaveSets() {
    //Save all reps and activity data collapse
  }

  onCancel() {
    //Deletes activity
  }

  onNewSet(set) {
    console.log('new set', set);
  }
}
