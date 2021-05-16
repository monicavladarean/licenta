import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CampsService } from '../services/camps.service';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.css']
})
export class AddCampComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private staffService: CampsService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      schedule: ['', Validators.required],
      requiredEquipment: ['', Validators.required],
      startDate: ['', Validators.required],
      duration: ['', Validators.required],
      capacity: ['', Validators.required],
      price: ['', Validators.required],
      minAge: ['', Validators.required],
      maxAge: ['', Validators.required],
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
console.log("submited");
    this.loading = true;
    this.staffService.addCamp(this.f.name.value,this.f.description.value,this.f.location.value,this.f.schedule.value, this.f.startDate.value, this.f.category.value, this.f.capacity.value, this.f.price.value, this.f.minAge.value, this.f.maxAge.value, this.f.requiredEquipment.value, this.f.duration.value)
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