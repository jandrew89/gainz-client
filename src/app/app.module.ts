import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { LayoutComponent } from './components/ui/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeService } from './data/employee.service';
import { LiftsListComponent } from './components/lifts/lifts-list/lifts-list.component';
import { SessionsListComponent } from './components/session/sessions-list/sessions-list.component';
import { SessionAddComponent } from './components/session/session-add/session-add.component';
import { ActivityListComponent } from './components/activity/activity-list/activity-list.component';
import { LiftService } from './data/lift.service';
import { SessionService } from './data/session.service';
import { SetListComponent } from './components/set/set-list/set-list.component';
import { ActivityDetailComponent } from './components/activity/activity-detail/activity-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/ui/header/header.component';
import { SettingsComponent } from './components/settings/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
    LiftsListComponent,
    SessionsListComponent,
    SessionAddComponent,
    ActivityListComponent,
    SetListComponent,
    ActivityDetailComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    ReactiveFormsModule,  
    FormsModule,
    NgbModule,
    RouterModule.forRoot([  
      {  
        path: 'home',  
        component: HomeComponent  
      },   
      {  
        path: 'settings',  
        component: SettingsComponent  
      },
      {
        path: 'sessions',
        component: SessionsListComponent
      },
      {  
        path: '',  
        redirectTo: 'home',  
        pathMatch: 'full'  
      },
      {  
        path: 'session-add/:id/:sessionType/edit',  
        component: SessionAddComponent  
      },   
      {  
        path: '**',  
        redirectTo: 'home',  
        pathMatch: 'full'  
      }
    ])
  ],
  providers: [EmployeeService,
    LiftService,
    SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
