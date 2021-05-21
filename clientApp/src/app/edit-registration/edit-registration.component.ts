import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { RegistrationsService } from '../services/registrations.service';
import { Registration } from '../models/registration';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent implements OnInit {

  editForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  registrationId:Number;
  element:Registration;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private registrationsService: RegistrationsService) { }

  ngOnInit(): void {
    this.registrationId = this.route.snapshot.params['id'];


    this.editForm = this.formBuilder.group({
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

  this.registrationsService.getRegistrationById(this.registrationId).subscribe(
    (data) => {
      data = JSON.parse(""+data);
      this.element = new Registration(this.registrationId,data.campId,data.firstName,data.lastName,data.email,data.dateOfBirth,data.information,data.parentFirstName,data.parentLastName,data.parentEmail,data.phone,data.registrationDate);
      this.prepareForm();   
    }
  );


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/campsList';
  }

  
prepareForm()
{
  this.editForm = this.formBuilder.group({
    firstName: [this.element.firstName, Validators.required],
    lastName: [this.element.lastName, Validators.required],
    email: [this.element.email, Validators.required],
    dateOfBirth: [this.element.dateOfBirth, Validators.required],
    information: [this.element.information, Validators.required],
    parentFirstName: [this.element.parentFirstName, Validators.required],
    parentLastName: [this.element.parentLastName, Validators.required],
    parentEmail: [this.element.parentEmail, Validators.required],
    phone: [this.element.phone, Validators.required],
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
    this.registrationsService.editRegistration(this.registrationId,this.element.campId,this.f.firstName.value,this.f.lastName.value,this.f.email.value,this.f.dateOfBirth.value,this.f.information.value,this.f.parentFirstName.value,this.f.parentLastName.value,this.f.parentEmail.value,this.f.phone.value)
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

