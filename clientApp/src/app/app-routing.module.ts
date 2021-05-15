import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

import { AuthenticationGuard } from './helpers/authenticationGuard';

const routes: Routes = [
  {path: '', component: UserTypeChoiceComponent},
  {path: 'homePage', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'companyDetails', component: CompanyDetailsComponent},
  {path: 'addRegistration', component: AddRegistrationComponent},
  {path: 'addStaff', component: AddStaffComponent, canActivate: [AuthenticationGuard]},
  {path: 'staffList', component: StaffListComponent, canActivate: [AuthenticationGuard]},
  {path: 'campsList', component: CampsListComponent},
  {path: 'addCamp', component: AddCampComponent, canActivate: [AuthenticationGuard]},
  {path: 'editStaff/:id', component: EditStaffComponent, canActivate: [AuthenticationGuard]},
  {path: 'editCamp/:id', component: EditCampComponent, canActivate: [AuthenticationGuard]},
  {path: 'editRegistration/:id', component: EditRegistrationComponent, canActivate: [AuthenticationGuard]},
  {path: 'campDetails/:id', component: CampDetailsComponent},
  {path: 'registrationsForCamp/:id', component: RegistrationsForCampComponent, canActivate: [AuthenticationGuard]},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
