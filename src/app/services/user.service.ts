import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user?: User;
  error: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private _utilitiesService: UtilitiesService, public router: Router) {

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('culturaxya-user') && localStorage.getItem('culturaxya-user') != "undefined") {
        this.user = JSON.parse(localStorage.getItem('culturaxya-user') || "");
      } else {
        this.user = {
          username: 'usuario' + Math.floor(Math.random() * 99999)
        }
        this.saveUser(this.user);
      }
    }
  }

  saveUser(user: User): void {

    this.user = user;
    window.localStorage.removeItem('culturaxya-user');
    window.localStorage.setItem('culturaxya-user', JSON.stringify(user));
  }

  confirmEmail(params: any) {
    this._utilitiesService.loading = true;
    return this.http.post(environment.baseUrl + 'user/confirmemail', params);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem('culturaxya-token');
    window.localStorage.setItem('culturaxya-token', JSON.stringify(token));
  }

  public getToken(): string | null {
    return window.localStorage.getItem('culturaxya-token');
  }

  public isRegisterUser(): string | null {
    return window.localStorage.getItem('culturaxya-token');
  }

}