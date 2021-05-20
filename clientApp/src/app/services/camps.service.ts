import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Camp } from '../models/camp';

@Injectable({ providedIn: 'root' })
export class CampsService {
  constructor(private httpClient: HttpClient) {}

  addCamp(
    name: string,
    description: string,
    location: string,
    schedule: string,
    startDate: Date,
    category: string,
    capacity: Number,
    price: Number,
    minAge: Number,
    maxAge: Number,
    requiredEquipment: string,
    duration: Number
  ): Observable<any> {
    return this.httpClient.post<Camp>(`${environment.apiUrl}/camps`, {
      name: name,
      description: description,
      location: location,
      schedule: schedule,
      startDate: startDate,
      category: category,
      capacity: capacity,
      price: price,
      minAge: minAge,
      maxAge: maxAge,
      requiredEquipment: requiredEquipment,
      duration: duration,
    });
  }

  editCamp(
    id: number,
    name: string,
    description: string,
    location: string,
    schedule: string,
    startDate: Date,
    endDate:Date,
    category: string,
    capacity: Number,
    price: Number,
    minAge: Number,
    maxAge: Number,
    requiredEquipment: string,
    duration: Number
  ): Observable<any> {
    return this.httpClient.put<Camp>(`${environment.apiUrl}/camps/` + id, {
      id: id,
      name: name,
      description: description,
      location: location,
      schedule: schedule,
      startDate: startDate,
      endDate: endDate,
      category: category,
      capacity: capacity,
      price: price,
      minAge: minAge,
      maxAge: maxAge,
      requiredEquipment: requiredEquipment,
      duration: duration,
    });
  }

  getAllCamps() {
    return this.httpClient.get<Camp[]>(`${environment.apiUrl}/camps`);
  }

  getCampById(id: number) {
    return this.httpClient.get<Camp>(`${environment.apiUrl}/camps/` + id);
  }

  deleteCamp(id: number): Observable<unknown> {
    return this.httpClient.delete(`${environment.apiUrl}/camps/` + id);
  }
}
