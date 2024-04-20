import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  alertSuccess: string = '';
  alertError: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {
  }

  sendMail(params: any) {
    let url = environment.baseUrl + 'utilities/sendMail';
    return this.http.post(url, params)
  }

  clearAlerts() {
    this.alertSuccess = '';
    this.alertError = '';
    this.loading = false;
  }

  cloneObject(object: any) {
    return JSON.parse(JSON.stringify(object));
  }

}