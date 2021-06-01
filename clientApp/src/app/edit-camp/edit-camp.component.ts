import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CampsService } from '../services/camps.service';
import { Camp } from '../models/camp';

@Component({
  selector: 'app-edit-camp',
  templateUrl: './edit-camp.component.html',
  styleUrls: ['./edit-camp.component.css']
})
export class EditCampComponent implements OnInit {

  editForm: FormGroup;
  id:number;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  element: Camp;

  categories: String[] = [
    'hiking',
    'biking',
    'horseriding',
    'swimming',
    'dance',
    'cooking',
    'language'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private campsService: CampsService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.editForm = this.formBuilder.group({
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

  this.campsService.getCampById(this.id).subscribe(
    (data) => {
      data = JSON.parse(""+data);
      this.element = new Camp(this.id,data.name, data.description,data.location,data.schedule,data.startDate,data.endDate,data.category,data.capacity,data.price,data.minAge,data.maxAge,data.requiredEquipment, data.duration);
      this.prepareForm();   
    }
  );


// get return url from route parameters or default to '/'
this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/campsList';

}

prepareForm()
{
  this.editForm = this.formBuilder.group({
    name: [this.element.name, Validators.required],
    location: [this.element.location, Validators.required],
    category: [this.element.category, Validators.required],
    description: [this.element.description, Validators.required],
    schedule: [this.element.schedule, Validators.required],
    requiredEquipment: [this.element.requiredEquipment, Validators.required],
    startDate: [this.element.startDate, Validators.required],
    duration: [this.element.duration, Validators.required],
    capacity: [this.element.capacity, Validators.required],
    price: [this.element.price, Validators.required],
    minAge: [this.element.minAge, Validators.required],
    maxAge: [this.element.maxAge, Validators.required],
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
  
  this.campsService.editCamp(this.id, this.f.name.value, this.f.description.value,this.f.location.value,this.f.schedule.value,this.f.startDate.value, this.f.category.value,this.f.capacity.value,this.f.price.value,this.f.minAge.value,this.f.maxAge.value,this.f.requiredEquipment.value,this.f.duration.value)
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
