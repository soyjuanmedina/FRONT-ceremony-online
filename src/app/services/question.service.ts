import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UtilitiesService } from './utilities.service';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(options: { params: HttpParams }) {
    return this.http.get(environment.baseUrl + 'questions', options);
  }
}