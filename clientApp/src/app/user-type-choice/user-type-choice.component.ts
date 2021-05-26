import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-type-choice',
  templateUrl: './user-type-choice.component.html',
  styleUrls: ['./user-type-choice.component.css']
})
export class UserTypeChoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem('userType', null)
  }

  setAdult(){
    sessionStorage.setItem('userType', 'adult');

  }

  setChild(){
    sessionStorage.setItem('userType', 'child');

  }
}
