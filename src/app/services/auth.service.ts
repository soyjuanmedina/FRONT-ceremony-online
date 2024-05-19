import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UtilitiesService } from './utilities.service';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
};

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  user: User;

  constructor ( private http: HttpClient, private _userService: UserService, private router: Router,
    public _utilitiesService: UtilitiesService ) { }

  /* login(credentials): Observable<any> {
    return this.http.post(AUTH_CONTROLLER + 'login', credentials, httpOptions);
  } */

  login ( credentials: any ) {
    return this.http.post( environment.baseUrl + 'auth/signin', credentials, httpOptions );
  }

  logout (): void {
    delete this._userService.user;
    localStorage.clear();
    this._userService.initUser();
  }

  register ( user: User ) {
    return this.http.post( environment.baseUrl + 'auth/signup', user, httpOptions );
  }

  resendActivationEmail ( credentials: any ) {
    return this.http.post( environment.baseUrl + 'auth/resend-activation-email', credentials, httpOptions );
  }
}