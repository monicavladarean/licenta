import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Registration } from '../models/registration';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegistrationsService {
    constructor(private httpClient: HttpClient) { }

    getRegistrationById(id:number){
      return this.httpClient.get<Registration>(`${environment.apiUrl}/registrations/`+id);
    }

    getAllRegistrationsForCamp(id:number) {
        return this.httpClient.get<Registration[]>(`${environment.apiUrl}/registrations?campIdForFilter=` + id);
    }

    deleteRegistration(id:number) : Observable<unknown>
    {
      return this.httpClient.delete(`${environment.apiUrl}/registrations/`+id);
    }
}