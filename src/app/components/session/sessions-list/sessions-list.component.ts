import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/data/services/session.service';
import { Session } from 'src/app/data/entities/session';
import * as moment from 'moment';
@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {

  sessions: Session[] = [];

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.getAllSessions().subscribe(
      sessions =>  this.sessions = sessions)
  }

  formatDate(dateToFormat: string) {
    return moment(dateToFormat).format('dddd, MMMM Do YYYY');
  }
}
