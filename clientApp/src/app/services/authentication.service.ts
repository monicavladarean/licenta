import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Staff } from '../models/staff';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<Staff>;
    public user: Observable<Staff>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<Staff>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): Staff {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        sessionStorage.setItem('userType', 'staff');
        return this.http.post<any>(`${environment.apiUrl}/staff/authenticate`, { username, password })
            .pipe(map(user => {
                user = JSON.parse(user);
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        sessionStorage.setItem('userType', 'null');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}