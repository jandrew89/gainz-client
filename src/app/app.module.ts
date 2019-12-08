import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeEditGuard } from './employee/employee-edit/employee-edit-guard';
import { RouterModule } from '@angular/router';
import { EmployeeService } from './data/employee.service';
import { LiftsListComponent } from './lifts/lifts-list/lifts-list.component';
import { SessionsListComponent } from './session/sessions-list/sessions-list.component';
import { SessionAddComponent } from './session/session-add/session-add.component';
import { ActivityListComponent } from './activity/activity-list/activity-list.component';
import { LiftService } from './data/lift.service';
import { SessionService } from './data/session.service';
import { SetListComponent } from './set/set-list/set-list.component';
import { ActivityDetailComponent } from './activity/activity-detail/activity-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeeDetailComponent,
    LiftsListComponent,
    SessionsListComponent,
    SessionAddComponent,
    ActivityListComponent,
    SetListComponent,
    ActivityDetailComponent
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
        path: 'employees',  
        component: EmployeeListComponent  
      },  
      {  
        path: 'employees/:id/:cityname',  
        component: EmployeeDetailComponent  
      },  
      {  
        path: 'employees/:id/:cityname/edit',  
        canDeactivate: [EmployeeEditGuard],  
        component: EmployeeEditComponent  
      },  
      {  
        path: 'lifts',  
        component: LiftsListComponent  
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
