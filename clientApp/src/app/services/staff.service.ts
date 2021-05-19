import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';

import {environment} from '../../environments/environment';
import { Staff } from '../models/staff';

@Injectable({ providedIn: 'root' })
export class StaffService {
    constructor(private httpClient: HttpClient) { }

    addStaff(isAdmin: boolean, username:string , password:string, firstName:string, lastName:string): Observable<any> {
      return this.httpClient.post<Staff>(`${environment.apiUrl}/staff` , {
        id: null,
        isAdmin: isAdmin,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    });
    }

    getAllStaff() {
        return this.httpClient.get<Staff[]>(`${environment.apiUrl}/staff`);
    }

    deleteStaff(id:number) : Observable<unknown>
    {
      return this.httpClient.delete(`${environment.apiUrl}/staff/`+id);
    }
}