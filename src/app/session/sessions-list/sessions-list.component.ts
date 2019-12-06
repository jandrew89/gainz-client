import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/data/session.service';
import { Session } from 'src/app/data/session';

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
      sessions => {
        this.sessions = sessions;
      }
    )
  }

  formatDate(date: string): string {
    var dateToFormat = new Date(date);
    var year = dateToFormat.getFullYear();

    var month = (1 + dateToFormat.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = dateToFormat.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }
}
