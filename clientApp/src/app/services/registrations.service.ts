import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Registration } from '../models/registration';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegistrationsService {
  constructor(private httpClient: HttpClient) {}

  getRegistrationById(id: Number) {
    return this.httpClient.get<Registration>(
      `${environment.apiUrl}/registrations/` + id
    );
  }

  getAllRegistrationsForCamp(id: number) {
    return this.httpClient.get<Registration[]>(
      `${environment.apiUrl}/registrations?campIdForFilter=` + id
    );
  }

  deleteRegistration(id: number): Observable<unknown> {
    return this.httpClient.delete(`${environment.apiUrl}/registrations/` + id);
  }

  addRegistration(
    campId: Number,
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: Date,
    information: string,
    parentFirstName: string,
    parentLastName: string,
    parentEmail: string,
    phone: string
  ): Observable<any> {
      console.log({
        id: null,
        campId: campId,
        kidId: null,
        firstName: firstName,
        lastName: lastName,
        email: email,
        dateOfBirth: dateOfBirth,
        information: information,

        adultId: null,
        parentFirstName: parentFirstName,
        parentLastName: parentLastName,
        parentEmail: parentEmail,
        phone: phone,
      });
    return this.httpClient.post<Registration>(
      `${environment.apiUrl}/registrations`,
      {
        campId: campId,
        adultFirstName: parentFirstName,
        adultLastName: parentLastName,
        adultEmail: parentEmail,
        adultPhone: phone,
        kidFirstName: firstName,
        kidLastName: lastName,
        kidEmail: email,
        kidDateOfBirth: dateOfBirth,
        kidInformation: information,

      }
    );
  }

  editRegistration(
    id:Number,
    campId: Number,
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: Date,
    information: string,
    parentFirstName: string,
    parentLastName: string,
    parentEmail: string,
    phone: string
  ): Observable<any> {
    return this.httpClient.put<Registration>(`${environment.apiUrl}/registrations/` + id, {
        campId: campId,
        adultFirstName: parentFirstName,
        adultLastName: parentLastName,
        adultEmail: parentEmail,
        adultPhone: phone,
        kidFirstName: firstName,
        kidLastName: lastName,
        kidEmail: email,
        kidDateOfBirth: dateOfBirth,
        kidInformation: information,
    });
  }
}
