import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/data/entities/session';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/data/entities/activity';
import { SessionService } from 'src/app/data/services/session.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { randonGuidGenerator } from 'src/app/shared/helper';
import { SessionPlan } from 'src/app/data/entities/session-plan';
import { EquipmentViewModel } from 'src/app/data/entities/ViewModel/equipmentviewmodel';
import { SessionPlanService } from 'src/app/data/services/session-plan.service';
import { isEqual } from 'lodash';
@Component({
  selector: 'app-session-add',
  templateUrl: './session-add.component.html',
  styleUrls: ['./session-add.component.css']
})
export class SessionAddComponent implements OnInit {

  sessionTitle = 'Session';
  isCollapsed = false
  session: Session;
  sessionPlan: SessionPlan;
  displayAddActivity: Boolean = false;
  onSaveDisable: boolean = false;
  isSessionActive: boolean = false;
  displayEditPlanModal: boolean;
  isSessionCached: boolean;

  private sub: Subscription;    

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private sessionPlanService: SessionPlanService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {      
    this.sub = this.route.paramMap.subscribe(
      params => {
        const localStorageSessionId = localStorage.getItem('CreatedSessionId');
        const id = params.get('id');
        const sessionType = params.get('sessionType');
        const sessionPlanId = params.get('planId');
        if (id == '0' && localStorageSessionId == undefined){
          //building a new session, either with plan or no plan
          this.buildNewSessionAsync(sessionPlanId, sessionType)
                .then(newSession => this.displaySession(newSession));         
        } else {
          //Get Session from service
          let idToPass = id == '0' ? localStorageSessionId : id;
          this.sessionService.getSession(idToPass, sessionType).subscribe(
            (session: Session) => {
              // active session
              this.isSessionActive = true;

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
    if (!this.session.sessionType) {
      this.toastr.error("Must select a session type.", "Validation Error");
      this.onSaveDisable = false;
      return;
    }
    
    //sesison is now active
    this.isSessionActive = true;

    //TODO possibly move this inside the sessions based on performance
    this.displayAddActivity = displayAddActivity;

    //Create or update session based on session id
    var session: Session = { ...this.session};

    
    if (session.id == '0') {
      this.sessionService.createSession(session).subscribe(
          session => {
            this.session.id = session.id;
            this.onSaveDisable = false;
          });
    } else {
      this.sessionService.updateSession(session, true).subscribe(
        () => this.onSaveDisable = false
      );
    }
  }

  onNewActivites(activities: Activity[]){
    this.session.activities = activities;
    this.saveSession();
  }

  displaySession(session: Session): void {
    this.session = session;
    if (this.session.id == '0'){
      this.sessionTitle = 'Add Session';
    } else {
      this.sessionTitle = `Edit Session: ${moment(this.session.sessionDate).format('dddd, MMMM Do YYYY')}`;
    }
  }

  saveSessionPlan() {
    //convert to session to session plan
    //TODO: Handle exsiting session plans
    this.sessionPlan = this.convertSessionToSessionPlan(this.session);
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
    var updatedSession = await this.sessionService.createSession(sessionToReturn).toPromise()

    sessionToReturn.id = updatedSession.id;
    //save sessionid to local storage
    localStorage.setItem('CreatedSessionId', sessionToReturn.id);

    // active session
    this.isSessionActive = true;

    return sessionToReturn;
  }
}
