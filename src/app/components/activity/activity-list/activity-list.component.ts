import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivityViewModel } from 'src/app/data/entities/activity';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { Equipment } from 'src/app/data/entities/equipment';
import { SessionService } from 'src/app/data/services/session.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit, OnChanges {

  @Input() activities: ActivityViewModel[];
  @Output() newActivites = new EventEmitter();
  @Output() resetAddActivity = new EventEmitter();
  @Input() addActivity: boolean;
  @Input() sessionId: string;
  @Input() sessionType: string //partition key
  
  newActivity: ActivityViewModel;
  equipment: Equipment[];
  selectedValue: string;

  constructor(private equipmentService: EquipmentService, private sessionService: SessionService) { }

  ngOnInit() {
    this.newActivity = { equipment: null, id: this.randonNumber(), sets: [], displayNewSet: true, order: 0 };
  }

  ngOnChanges(changes: any): void {
    this.equipmentService.getEquipment().subscribe(
      equipment => {
        this.equipment = equipment.filter(f => f.sessionTypes == null ? false : f.sessionTypes.some(s => s.name == this.sessionType));
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
      this.sessionService.getPreviousSetsByEquipment(this.selectedValue, this.sessionType).subscribe(
        sets => {
          console.log(sets);
        }
      )
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
