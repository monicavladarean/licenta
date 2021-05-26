import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from '../models/staff';
import { StaffService } from '../services/staff.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css'],
})
export class StaffListComponent implements OnInit {
  displayedColumns = [
    'username',
    'lastName',
    'firstName',
    'isAdmin',
    'actions',
    'remove'
  ];
  staffItems: Staff[];
  isLoading: boolean;

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {

    this.staffService
      .getAllStaff()
      .subscribe(
        ()=>this.fetchData()
      );
  }

  deleteStaff(id:number, username:string)
  {
    if(username!="admin")
      {if(confirm("Are you sure you want to delete " + username + " ?")) 
      {
        this.staffService.deleteStaff(id).subscribe(()=>this.fetchData());
      }
    }
    else
      {
        alert("Admin can't be deleted!");
      }
  }

  fetchData() {
    this.isLoading = true;
    this.staffService
    .getAllStaff()
    .subscribe(
      (data) => { 
        this.staffItems = JSON.parse(""+data);
        this.isLoading = false;
      },
      (error) => {
        console.log('Table could not be filled with data', error);
        this.isLoading = false;
      }
    );
  }
}
