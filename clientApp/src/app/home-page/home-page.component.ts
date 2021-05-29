import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userType:string;

  constructor() {
    this.userType = sessionStorage.getItem('userType');
   }

  ngOnInit(): void {
  }

}
