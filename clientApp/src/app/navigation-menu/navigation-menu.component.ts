import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { Staff } from '../models/staff';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css'],
})
export class NavigationMenuComponent implements OnInit {
  user: Staff;
  isAdmin: boolean = false;
  userType: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user.subscribe((x) => (this.user = x));

    this.userType = sessionStorage.getItem('userType');

    if (this.user != null) {
      if ('' + this.user.isAdmin === 'true') {
        this.isAdmin = Boolean(true);
      } else if ('' + this.user.isAdmin === 'false') {
        this.isAdmin = Boolean(false);
      }
    }
  }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
  }
}
