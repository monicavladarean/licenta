import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Camp } from '../models/camp';
import { Staff } from '../models/staff';
import { CampsService } from '../services/camps.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-camps-list',
  templateUrl: './camps-list.component.html',
  styleUrls: ['./camps-list.component.css']
})
export class CampsListComponent implements OnInit {

  user: Staff;
  isAdmin: boolean = false;
  userType: string;

  displayedColumns = [
    'name',
    'category',
    'location',
    'startDate',
    'duration',
    'minAge',
    'maxAge',
  ];
  campItems: Camp[];

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  //selection = new SelectionModel<InventoryItem>(true, []);
  isLoading: boolean;
  //activeOnly$=new BehaviorSubject(false);
  //itemsCount = 0;

  constructor(private campsService: CampsService, private router: Router,private authenticationService: AuthenticationService) { 
    this.authenticationService.user.subscribe((x) => (this.user = x));
    this.userType = sessionStorage.getItem('userType');

    if(this.userType!='child')
    {
      this.displayedColumns.push('register');
    }
    
    if(this.user!=null)
    {if(""+this.user.isAdmin==='true')
     {
      this.isAdmin=Boolean(true);
      this.displayedColumns.push('edit','delete');
     }
    else if(""+this.user.isAdmin==='false')
     {
      this.isAdmin=Boolean(false);
     } 
     this.displayedColumns.push('registeredKids');
    }
   
  }

  ngOnInit(): void {
    this.campsService
      .getAllCamps()
      .subscribe(
        ()=>this.fetchData()
      );
  }

  fetchData() {
    this.isLoading = true;
    this.campsService
    .getAllCamps()
    .subscribe(
      (data) => { 
        this.campItems = JSON.parse(""+data);
        this.isLoading = false;
      },
      (error) => {
        console.log('Table could not be filled with data', error);
        this.isLoading = false;
      }
    );
  }

  deleteCamp(id:number, name:string)
  {
      if(confirm("Are you sure you want to delete " + name + " ?")) 
      {
        this.campsService.deleteCamp(id).subscribe(()=>this.fetchData());
      }
  }

  showCampDetails(id:number)
  {
    this.router.navigate(['/campDetails/'+id]);
  }

}
