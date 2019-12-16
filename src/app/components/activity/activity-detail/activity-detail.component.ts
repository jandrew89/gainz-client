import { Component, OnInit, Input } from '@angular/core';
import { Activity, Set } from 'src/app/data/entities/activity';
import { SessionService } from 'src/app/data/services/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-detail,[app-activity-detail]',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

  @Input() activity: Activity
  @Input() sessionId: string
  @Input() sessionType: string //partition key

  isCollapsed = false
  displayNewSet = false;
  displaySaveSet = false;
  shouldDisplaySetMap = new Map<number, boolean>();
  setMap = new Map<number, Set>();
  disableButtons: boolean = false;

  constructor(private sessionService: SessionService, private toastr: ToastrService) { }

  ngOnInit() { }

  async onAddSet() {
    //Save all reps and activity data add new rep input
    //display a new set
    this.displayNewSet = true;
  }


  onSaveSets() {
    //TODO Add check that sets exists

    //Save all reps and activity data collapse
    //this.saveSets();
  }

  onCancel() {
    //Deletes activity
  }

  async saveSet() {
    this.displayNewSet = false;

    var validationFail = [...this.setMap.values()].some(set => set.reps == null || set.weight == null);
    if (validationFail) {
      this.toastr.error('Must Enter a valid input.');
      return;
    }
    this.disableButtons = true;

    var idsToRemove = Array.from(this.setMap.values()).map(m => m.order);

    var sets = this.activity.sets.filter(f => !idsToRemove.includes(f.order));

    this.activity.sets = [...this.setMap.values(), ...sets];

    if (this.setMap.has(0)) {
      this.activity.sets.forEach(set => {
        set.order = set.order + 1;
      });
    }

    var isSuccess = await this.saveSetsAsync();
    if (isSuccess) {
      this.toastr.success('Set Saved Successfull')
      this.displaySaveSet = false;
      this.shouldDisplaySetMap.clear();
      this.setMap.clear();
      this.disableButtons = false;
    }
  }

  onNewSet(selectedValue: any) {
    this.shouldDisplaySetMap.set(selectedValue.order, true);
    
    if (selectedValue.order == 0) {
      this.setMap.set(selectedValue.order, selectedValue);
    }

    this.activity.sets.forEach(
      set => { 
        if (this.isEquivalent(set, selectedValue)) {
            this.shouldDisplaySetMap.set(selectedValue.order, false);
            this.setMap.delete(set.order);
        }

        if (set.order === selectedValue.order && !this.isEquivalent(set, selectedValue)) {
          this.setMap.set(set.order, selectedValue);
        }
      }
    )

    this.displaySaveSet = [...this.shouldDisplaySetMap.values()].reduce((sum, next) =>  sum || next, false);
  }

  private async saveSetsAsync(): Promise<boolean> {
    return await this.sessionService.updateActivity(this.sessionId, this.sessionType, this.activity).toPromise();
  }

  isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
}
