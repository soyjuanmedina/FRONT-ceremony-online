import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { QuestionDto } from '../models/questionDto';

const httpOptions = {
  headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
};

@Injectable( {
  providedIn: 'root'
} )
export class QuestionService {

  constructor ( private http: HttpClient ) { }

  getQuestions ( options: { params: HttpParams } ) {
    return this.http.get( environment.baseUrl + 'questions', options );
  }

  propose ( question: QuestionDto ) {
    return this.http.post( environment.baseUrl + 'questions', question );
  }
}