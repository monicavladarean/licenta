import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { StaffService } from '../services/staff.service';
import { Staff } from '../models/staff';
@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit {

  editForm: FormGroup;
  id:number;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  element: Staff;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService
  ) { 

  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: ['', Validators.required],
  });


    this.staffService.getStaffById(this.id).subscribe(
      (data) => {
        data = JSON.parse(""+data);
        this.element = new Staff(this.id,data.isAdmin,data.username,data.firstName,data.lastName,data.password);
        this.prepareForm();   
      }
    );


  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/staffList';
  }

  prepareForm()
  {
    this.editForm = this.formBuilder.group({
      firstName: [this.element.firstName, Validators.required],
      lastName: [this.element.lastName, Validators.required],
      username: [this.element.username, Validators.required],
      isAdmin: [this.element.isAdmin, Validators.required],
      password: [this.element.password, Validators.required],
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }
    this.loading = true;
    this.staffService.editStaff(this.id, this.f.isAdmin.value,this.f.username.value, this.f.password.value,this.f.firstName.value, this.f.lastName.value)
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = "Wrong input";
                this.loading = false;
            });
}

}
