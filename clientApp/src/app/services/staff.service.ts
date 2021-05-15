import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';
import { Staff } from '../models/staff';

@Injectable({ providedIn: 'root' })
export class StaffService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Staff[]>(`${environment.apiUrl}/staff`);
    }
}