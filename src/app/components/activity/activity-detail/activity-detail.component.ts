import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity, Set } from 'src/app/data/entities/activity';
import { SessionService } from 'src/app/data/services/session.service';
import { ToastrService } from 'ngx-toastr';
import { SetDate } from 'src/app/data/entities/Dtos/SetDate';
import { ListBase } from 'src/app/shared/list-base';
import * as moment from 'moment';
@Component({
  selector: 'app-activity-detail,[app-activity-detail]',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent extends ListBase implements OnInit {

  @Input() activity: Activity
  @Input() sessionId: string
  @Input() sessionDate: Date;
  @Input() sessionType: string //partition key
  @Output() onDeleteActivity = new EventEmitter();

  displayPreviousSets = false;
  disableButtons = false;
  disablePreviousSetBtn = false;

  activeSets: Set[];
  previousSets: SetDate[];
  
  constructor(private sessionService: SessionService, 
        private toastr: ToastrService) { super() }

  ngOnInit() { 
    //initialization of variables
    this.previousSets = [];
    this.activeSets = this.activity.sets;
  }

  async onAddSet() {
    //adds new set
    //resets the order so they dont get out of sync
    //saves the set
    this.activeSets = this.rebaseToZero(this.activeSets);
    
    this.activeSets.push({
        order: 0,
        reps: null,
        weight: null
    });

    this.activity.sets = this.activeSets;
  }

  formatDate(dateToFormat: Date): string  {
    return moment(dateToFormat).format('dddd, MMMM Do YYYY');
  }

  formatDateDifference(dateToDiff: Date): number {
    let date1 = moment(dateToDiff);
    let date2 = moment(this.sessionDate);

    return date2.diff(date1, 'days');
  }

  onCancel() {
    //Deletes activity
    this.sessionService.deleteActivity(this.sessionId, this.activity.id, this.sessionType).subscribe(
      isSuccessful => isSuccessful ? this.onDeleteActivity.emit(this.activity.id) : this.toastr.error('Error when deleteing activity.')
    );
  }

  async saveSet(): Promise<boolean> {

    //disable buttons while saving
    this.disableButtons = true;

    //determines whether a the sets values are valid  
    const formValid = !this.activeSets.some(s => s.reps == null || s.weight == null);

    //alert if invalod
    if (!formValid) {
      this.toastr.info('Form is not valid')
      this.disableButtons = false;
      return false;
    }

    //form is valid reassign active sets to activity sets
    this.activity.sets = this.activeSets;

    var isSuccess = await this.saveSetsAsync();
      if (isSuccess) {
        this.toastr.success('Set Saved Successfull')
        this.disableButtons = false;
      }

      return isSuccess;
  }

  onDisplayPreviousSets() {
    this.disablePreviousSetBtn = true;
    this.displayPreviousSets = !this.displayPreviousSets;
    

    //Get previous reps for equipment
    if (this.previousSets.length <= 0) {
      this.sessionService.getPreviousSetsByEquipment(this.activity.equipment.id, this.sessionType)
          .subscribe(sets => {
            this.previousSets = sets;

            //No previous sets came back
            //Keep the button locked to avoid sequiential db calls
            //alert user
            if (sets.length <= 0) {
              this.toastr.info('No Previous sets found for this exercise.');
              return;
            }
            this.disablePreviousSetBtn = false;
          })
      } else {
        this.disablePreviousSetBtn = false;
      }
  }

  onNewSet(activeSet: Set) {
    //First we filter out sets not being updated
    let activeSets = this.activeSets.filter(f => f.order !== activeSet.order);
    
    //Then add in new active set
    activeSets.push(activeSet);

    //Then rebase active sets back to the activity
    this.activeSets = activeSets.sort((a,b) => a.order - b.order);
  }

  private async saveSetsAsync(): Promise<boolean> {
    return await this.sessionService.updateActivity(this.sessionId, this.sessionType, this.activity).toPromise();
  }
}
