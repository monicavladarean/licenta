import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserTypeChoiceComponent } from './user-type-choice/user-type-choice.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddCampComponent } from './add-camp/add-camp.component';
import { EditCampComponent } from './edit-camp/edit-camp.component';
import { CampsListComponent } from './camps-list/camps-list.component';
import { CampDetailsComponent } from './camp-details/camp-details.component';
import { RegistrationsForCampComponent } from './registrations-for-camp/registrations-for-camp.component';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserTypeChoiceComponent,
    HomePageComponent,
    AddStaffComponent,
    EditStaffComponent,
    StaffListComponent,
    AddCampComponent,
    EditCampComponent,
    CampsListComponent,
    CampDetailsComponent,
    RegistrationsForCampComponent,
    AddRegistrationComponent,
    EditRegistrationComponent,
    CompanyDetailsComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
