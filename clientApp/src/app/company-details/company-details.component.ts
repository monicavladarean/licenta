import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  userType:string;

  constructor() {
    this.userType = sessionStorage.getItem('userType');
   }

  ngOnInit(): void {
  }

}
