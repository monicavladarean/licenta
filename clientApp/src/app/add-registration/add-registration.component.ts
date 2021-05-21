import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { RegistrationsService } from '../services/registrations.service';

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.css']
})
export class AddRegistrationComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  campId:Number;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private registrationsService: RegistrationsService) { }

  ngOnInit(): void {

    this.campId = this.route.snapshot.params['id'];


    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      information: ['', Validators.required],
      parentFirstName: ['', Validators.required],
      parentLastName: ['', Validators.required],
      parentEmail: ['', Validators.required],
      phone: ['', Validators.required],
  });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/campsList';
  }


  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
        return;
    }

    this.loading = true;
    this.registrationsService.addRegistration(this.campId,this.f.firstName.value,this.f.lastName.value,this.f.email.value,this.f.dateOfBirth.value,this.f.information.value,this.f.parentFirstName.value,this.f.parentLastName.value,this.f.parentEmail.value,this.f.phone.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = "Wrong input data";
                this.loading = false;
            });
}

}

