import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Session } from 'src/app/data/entities/session';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/data/entities/activity';
import { SessionService } from 'src/app/data/services/session.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { formatDateToDatePicker, randonGuidGenerator } from 'src/app/shared/helper';
import { SessionPlan } from 'src/app/data/entities/session-plan';
import { EquipmentViewModel } from 'src/app/data/entities/ViewModel/equipmentviewmodel';
import { SessionPlanService } from 'src/app/data/services/session-plan.service';
declare var $: any;
@Component({
  selector: 'app-session-add',
  templateUrl: './session-add.component.html',
  styleUrls: ['./session-add.component.css']
})
export class SessionAddComponent implements OnInit {

  sessionTitle = 'Session';
  sessionForm: FormGroup;
  isCollapsed = false
  session: Session;
  sessionPlan: SessionPlan;
  displayAddActivity: Boolean = false;
  onSaveDisable: boolean = false;
  private sub: Subscription;    

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private sessionPlanService: SessionPlanService,
    private toastr: ToastrService    
    ) { }

  ngOnInit() {
    $(document).ready(function(){
      $('select').formSelect();
      $('.datepicker').datepicker();
      var themeColor = '#ffd8a6'
      $(".select-dropdown").css("color", themeColor);
    });
    
    this.sessionForm = this.formBuilder.group({    
      weight: '',    
      sessionDate: '',    
      sessionType: ''  
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        const sessionType = params.get('sessionType');
        const sessionPlanId = params.get('planId');

        if (id == '0'){
          this.buildNewSessionAsync(sessionPlanId, sessionType)
                .then(newSession => this.displaySession(newSession));         
        } else {
          //Get Session from service
          this.sessionService.getSession(id, sessionType).subscribe(
            (session: Session) => { 
              this.session = session;
              this.displaySession(session) }
          );
        }
      }
    )
  }

  saveSession(displayAddActivity: boolean = false): void {
    //disable save btns
    this.onSaveDisable = true;

    //validate form
    if (this.sessionForm.controls['sessionType'].value == '' || this.sessionForm.controls['sessionType'].value == undefined) {
      this.toastr.error("Must select a session type.", "Validation Error");
      this.onSaveDisable = false;
      return;
	  }

	//TODO possibly move this inside the sessions based on performance
	this.displayAddActivity = displayAddActivity;

    //Create or update session based on session id
    var session = { ...this.session, ...this.sessionForm.value};
    if (session.id == '0') {
      this.sessionService.createSession(session).subscribe(
          session => {
            this.session.id = session.id;
            this.session.sessionType = session.sessionType;
            this.onSaveDisable = false;
          });
    } else {
      this.sessionService.updateSession(session).subscribe(
        () => this.onSaveDisable = false
      );
    }
  }

  onNewActivites(activities: Activity[]){
    this.session.activities = activities;
    this.saveSession();
  }

  displaySession(session: Session): void {
    if (this.sessionForm){
      this.sessionForm.reset();
    }

    this.session = session;
    if (this.session.id == '0'){
      this.sessionTitle = 'Add Session';
    } else {
      this.sessionTitle = `Edit Session: ${moment(this.session.sessionDate).format('dddd, MMMM Do YYYY')}`;
    }

    $('.select-dropdown').val(this.session.sessionType);
    
    this.sessionForm.patchValue({
      weight: this.session.weight,
      sessionDate: formatDateToDatePicker(this.session.sessionDate),
      sessionType: this.session.sessionType
    });
  }

  saveSessionPlan() {
    //convert to session to session plan
    //TODO: Handle exsiting session plans
    this.sessionPlan = this.convertSessionToSessionPlan(this.session);

    //save/update session plan
    this.sessionPlanService.createSessionPlan(this.sessionPlan).subscribe(
      sessionPlan => {
        this.toastr.success('New session plan created!')
        this.sessionPlan = sessionPlan;
      }
    )
  }

  removeSession() {
    if (this.session.id == '0') {
      this.router.navigate(['/sessions']);
    } else {
      this.sessionService.deleteSession(this.session.id, this.session.sessionType)
          .subscribe(
            isSuccesful => {
              if (isSuccesful) {
                this.toastr.success('Session successfully deleted.');
                this.router.navigate(['/sessions']);
              }
          }
      );
    }
  }

  onSaveComplete(): void {    
    this.sessionForm.reset();    
  }

  sort(activities: Activity[]): Activity[] {
    return activities.sort((a,b) => a.order - b.order);
  }

  private convertSessionToSessionPlan(session: Session): SessionPlan {
    let equpiment: EquipmentViewModel[] = [];

    session.activities.forEach(act => {
      equpiment.push({
        id: act.equipment.id,
        name: act.equipment.name
      });     
    });

    return {
      id: '0',
      equipment: equpiment,
      sessionType: session.sessionType,
      sessionPlanName: `${moment(session.sessionDate).format('MMMM-DD-YYYY')}-${session.sessionType}`
    }
  }

  private convertSessionPlanToSession(sessionPlan: SessionPlan): Session {
    let activities: Activity[] = [];
    let order = 0;

    sessionPlan.equipment.forEach(act => {
      activities.push({
        equipment: {
          id: act.id,
          name: act.name,
          sessionTypes: null
        },
        id: randonGuidGenerator(),
        order: order,
        sets: []
      });
      order = order++
    });

    return {
      id: '0',
      activities: activities,
      sessionType: sessionPlan.sessionType,
      sessionPlan: { id: sessionPlan.id, sessionPlanName: sessionPlan.sessionPlanName },
      sessionDate: new Date(),
      weight: 0
    }
  }

  private async buildNewSessionAsync(sessionPlanId?: string, sessionType?: string): Promise<Session> {
    // null plan id and type returns empty session
    if (sessionPlanId == null || sessionType == null) 
      return { id: "0", weight: 0, sessionDate: new Date(), sessionType: '', activities: [] }
    
    // planId and type passed in
    // get session plan
    var sessionPlan = await this.sessionPlanService.GetSessionPlanBySessionPlanId(sessionPlanId, sessionType).toPromise();

    //convert to session
    var sessionToReturn = this.convertSessionPlanToSession(sessionPlan);

    //save session to db
    //assign return id
    this.sessionService.createSession(sessionToReturn).subscribe(session => sessionToReturn.id = session.id);

    //return updated session
    return sessionToReturn;
  }
}
