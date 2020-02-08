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
import { LiftsListComponent } from './components/lifts/lifts-list/lifts-list.component';
import { SessionsListComponent } from './components/session/sessions-list/sessions-list.component';
import { SessionAddComponent } from './components/session/session-add/session-add.component';
import { ActivityListComponent } from './components/activity/activity-list/activity-list.component';
import { EquipmentService } from './data/services/equipment.service';
import { SessionService } from './data/services/session.service';
import { SetListComponent } from './components/set/set-list/set-list.component';
import { ActivityDetailComponent } from './components/activity/activity-detail/activity-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/ui/header/header.component';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SetDetailComponent } from './components/set/set-detail/set-detail.component';
import { EquipmentDetailComponent } from './components/lifts/equipment-detail/equipment-detail.component';
import { SessionPlanListComponent } from './components/session/session-plan-list/session-plan-list.component';
import { EnvironmentVariablesComponent } from './components/settings/environment-variables/environment-variables.component';
import { SessionPlanSettingsComponent } from './components/settings/session-plan-settings/session-plan-settings.component';
import { SessionPlanEditSettingsComponent } from './components/settings/session-plan-edit-settings/session-plan-edit-settings.component';
import { SessionTypeSettingsComponent } from './components/settings/session-type-settings/session-type-settings.component';

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
    SettingsComponent,
    SetDetailComponent,
    EquipmentDetailComponent,
    SessionPlanListComponent,
    EnvironmentVariablesComponent,
    SessionPlanSettingsComponent,
    SessionPlanEditSettingsComponent,
    SessionTypeSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    ReactiveFormsModule,  
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
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
        path: 'sessions/session-add/:id/:sessionType/:planId/edit',  
        component: SessionAddComponent  
      },
      {  
        path: 'sessions/session-add/:id/:sessionType/edit',  
        component: SessionAddComponent  
      },
      {
        path: 'lifts',
        component: LiftsListComponent
      },
      {
        path: 'sessions/equipment',
        component: LiftsListComponent
      },
      {
        path: 'settings/env',
        component: EnvironmentVariablesComponent
      },
      {
        path: 'settings/plans',
        component: SessionPlanSettingsComponent
      },
      {
        path: 'settings/sessiontypes',
        component: SessionTypeSettingsComponent
      },
      {  
        path: '**',  
        redirectTo: 'home',  
        pathMatch: 'full'  
      }
    ])
  ],
  providers: [
    EquipmentService,
    SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
