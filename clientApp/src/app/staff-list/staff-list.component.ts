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
    'id',
    'username',
    'lastName',
    'firstName',
    'isAdmin',
    'actions',
    'remove'
  ];
  staffItems: Staff[];

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  //selection = new SelectionModel<InventoryItem>(true, []);
  isLoading: boolean;
  //activeOnly$=new BehaviorSubject(false);
  //itemsCount = 0;

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
      if(confirm("Are you sure to delete " + username + " ?")) 
      {
        this.staffService.deleteStaff(id).subscribe(()=>this.fetchData());
      }
  }

  fetchData() {
    this.staffService
    .getAllStaff()
    .subscribe(
      (data) => { 
        this.staffItems = JSON.parse(""+data);
      },
      (error) => {
        console.log('Table could not be filled with data', error);
      }
    );
  }
}
