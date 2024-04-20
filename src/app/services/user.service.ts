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

  user: any = null;
  error: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private _utilitiesService: UtilitiesService, public router: Router) {

    if (isPlatformBrowser(this.platformId) && sessionStorage.getItem('online-ceremony-user')) {
      this.user = JSON.parse(sessionStorage.getItem('online-ceremony-user') || "");
    }
  }

  saveUser(user: any): void {
    this.user = user;
    window.sessionStorage.removeItem('online-ceremony-user');
    window.sessionStorage.setItem('online-ceremony-user', JSON.stringify(user));
  }

  confirmEmail(params: any) {
    this._utilitiesService.loading = true;
    return this.http.post(environment.baseUrl + 'user/confirmemail', params);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('online-ceremony-token');
    window.sessionStorage.setItem('online-ceremony-token', JSON.stringify(token));
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem('online-ceremony-token');
  }

}