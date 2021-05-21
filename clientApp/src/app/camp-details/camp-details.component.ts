import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CampsService } from '../services/camps.service';
import { Camp } from '../models/camp';

@Component({
  selector: 'app-camp-details',
  templateUrl: './camp-details.component.html',
  styleUrls: ['./camp-details.component.css']
})
export class CampDetailsComponent implements OnInit {

  id:number;
  element: Camp;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private campsService: CampsService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.element=new Camp(null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  

  this.campsService.getCampById(this.id).subscribe(
    (data) => {
      data = JSON.parse(""+data);
      this.element = new Camp(this.id,data.name, data.description,data.location,data.schedule,data.startDate,data.endDate,data.category,data.capacity,data.price,data.minAge,data.maxAge,data.requiredEquipment, data.duration);
    }
  );
}

register()
{
  this.router.navigate(['/addRegistration/'+this.id]);
}
}

