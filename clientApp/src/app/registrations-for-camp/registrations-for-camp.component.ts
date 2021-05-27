import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Registration } from '../models/registration';
import { RegistrationsService} from '../services/registrations.service';
import { AuthenticationService } from '../services/authentication.service';
import { Staff } from '../models/staff';

@Component({
  selector: 'app-registrations-for-camp',
  templateUrl: './registrations-for-camp.component.html',
  styleUrls: ['./registrations-for-camp.component.css'],
})
export class RegistrationsForCampComponent implements OnInit {

  displayedColumns = [
    'name',
    'phone',
    'parentName',
    'parentEmail',
    'dateOfBirth',
    'information',
    'email',
    'registrationDate',
  ];
  registrationItems: Registration[];
  campId:number;
  isLoading: boolean;
  user: Staff;
  isAdmin: boolean = false;
  userType:string;

  constructor(private registrationsService:RegistrationsService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { 
      this.authenticationService.user.subscribe((x) => (this.user = x));

      this.userType = sessionStorage.getItem('userType');

      if (this.user != null) {
        if ('' + this.user.isAdmin === 'true') {
          this.isAdmin = Boolean(true);
          this.displayedColumns.push('actions');
          this.displayedColumns.push('remove');
        } else if ('' + this.user.isAdmin === 'false') {
          this.isAdmin = Boolean(false);
        }
      }
      
    }

  ngOnInit(): void {

    this.campId = this.route.snapshot.params['id'];

    this.registrationsService
    .getAllRegistrationsForCamp(this.campId)
    .subscribe(
      ()=>this.fetchData()
    );
  }

  fetchData() {
    this.isLoading = true;
    this.registrationsService
    .getAllRegistrationsForCamp(this.campId)
    .subscribe(
      (data) => { 
        this.registrationItems = JSON.parse(""+data);
        this.isLoading = false;
      },
      (error) => {
        console.log('Table could not be filled with data', error);
        this.isLoading = false;
      }
    );
  }

  deleteRegistration(id:number, firstName:string,lastName:string)
  {
      if(confirm("Are you sure you want to delete the registration for " + firstName + " " + lastName + " ?")) 
      {
        this.registrationsService.deleteRegistration(id).subscribe(()=>this.fetchData());
      }
  }

}
