import { Component, OnInit, Input } from '@angular/core';
import { Activity, Set } from 'src/app/data/activity';
import { SessionService } from 'src/app/data/session.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

  @Input() activity: Activity
  @Input() sessionId: string
  @Input() sessionType: string //partition key

  isCollapsed = false
  displayNewSet = false;
  
  constructor(private sessionService: SessionService) { }

  ngOnInit() { }

  onAddSet() {
    //Save all reps and activity data add new rep input
    //display a new set
    this.displayNewSet = true;
  }


  onSaveSets() {
    //TODO Add check that sets exists

    //Save all reps and activity data collapse
    this.saveSets();
  }

  onCancel() {
    //Deletes activity
  }

  onNewSet(sets: Set[]) {
    //Add sets back into activity
    this.activity.sets = sets;

    //save activity
    this.saveSets();

    //Hide new set
    this.displayNewSet = false;
  }

  private saveSets() {
    this.sessionService.updateActivity(this.sessionId, this.sessionType, this.activity).subscribe(
      results => {
        console.log(results);
      }
    );
  }
}
