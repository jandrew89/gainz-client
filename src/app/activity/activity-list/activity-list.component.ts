import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivityViewModel } from 'src/app/data/activity';
import { LiftService } from 'src/app/data/lift.service';
import { Equipment } from 'src/app/data/equipment';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {


  @Input() activities: ActivityViewModel[];
  @Output() newActivites = new EventEmitter();
  @Output() resetAddActivity = new EventEmitter();
  @Input() addActivity: boolean;
  @Input() sessionId: string;
  
  newActivity: ActivityViewModel;
  equipment: Equipment[];
  selectedValue: string;

  constructor(private liftService: LiftService) { }

  ngOnInit() {
    this.newActivity = { equipment: null, id: this.randonNumber(), sets: [], displayNewSet: true, order: 0 };
    this.liftService.getEquipment().subscribe(
      equipment => {
        this.equipment = equipment;
      }
    )
  }

  //Add Activity
  onAddSet(activity: ActivityViewModel): void {
    activity.displayNewSet = true;
  }

  onNewSaveSet(activity: ActivityViewModel): void {
    //remove updated activity
    var results = this.activities.filter(f => f.id !== activity.id);
    results.push(activity);
    //Save Sets to db
    this.newActivites.emit(results);
  }

  onSaveSet(activty: ActivityViewModel): void {
    
  }

  onSaveActivity(): void {
    if (this.selectedValue !== undefined) {
      if (this.activities == null) {
        this.activities = [];
      }

      var equipment = this.equipment.find(f => f.id == this.selectedValue);

      this.newActivity.equipment = equipment;
   
      this.activities.unshift(this.newActivity);
      this.activities.forEach(act => {act.order = act.order + 1});

      //Get previous reps by equipment
      

      //Saveing activites
      this.newActivites.emit(this.activities);
      this.newActivity = { equipment: null, id: this.randonNumber(), sets: [], displayNewSet: true, order: 0 };
    }

    this.resetAddActivity.emit(false);
  }

  randonNumber(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
