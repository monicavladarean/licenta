import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Registration } from '../models/registration';
import { RegistrationsService} from '../services/registrations.service';

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
    'actions',
    'remove'
  ];
  registrationItems: Registration[];
  campId:number;
  isLoading: boolean;

  constructor(private registrationsService:RegistrationsService,
    private route: ActivatedRoute,
    private router: Router) { }

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
