import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivityViewModel } from 'src/app/data/entities/activity';
import { EquipmentService } from 'src/app/data/services/equipment.service';
import { Equipment } from 'src/app/data/entities/equipment';
import { randonGuidGenerator } from 'src/app/shared/helper';
import { ListBase } from 'src/app/shared/list-base';
import { ListEquipmentFilterBaseClase } from 'src/app/shared/list-filter-base';

declare var $: any;

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent extends ListEquipmentFilterBaseClase<Equipment> implements OnInit, OnChanges {

  @Input() activities: ActivityViewModel[];
  @Output() newActivites = new EventEmitter();
  @Output() resetAddActivity = new EventEmitter();
  @Input() addActivity: boolean;
  @Input() sessionDate: Date;
  @Input() sessionId: string;
  @Input() sessionType: string; //partition key

  newActivity: ActivityViewModel;

  constructor(private equipmentService: EquipmentService) { super() }

  ngOnInit() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
    this.newActivity = { equipment: null, id: randonGuidGenerator(), sets: [], displayNewSet: true, order: 0 };
  }

  ngOnChanges(changes: any): void {
    this.equipmentService.getEquipment().subscribe(
      equipment => {
        this.unfilteredList = equipment.filter(f => f.sessionTypes == null ? false : f.sessionTypes.some(s => s.name == this.sessionType));
        
        //filtered list is need in baseclass
        this.filteredListOfItems = this.unfilteredList;
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

  onSaveActivity(id : string): void {
    if (id !== undefined) {
      if (this.activities == null) {
        this.activities = [];
      }

      var equipment = this.unfilteredList.find(f => f.id == id);

      this.newActivity.equipment = equipment;
   
      this.activities.unshift(this.newActivity);
      this.activities = this.rebaseToZero(this.activities);

      //Saveing activites
      this.newActivites.emit(this.activities);
      this.newActivity = { equipment: null, id: randonGuidGenerator(), sets: [], displayNewSet: true, order: 0 };
    }

    this.resetAddActivity.emit(false);
  }

  onDeleteActivity(activityId: string) {
    this.activities = this.activities.filter(type => type.id !== activityId);
  }
}
