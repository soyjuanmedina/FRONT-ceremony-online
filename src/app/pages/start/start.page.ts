import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { Question } from "../../models/question";
import { RandomOrderPipe } from '../../pipes/random-order';
import { TranslateModule } from '@ngx-translate/core';

const NUMBER_OF_QUESTIONS = 2;

@Component({
  selector: 'start-page',
  templateUrl: './start.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RandomOrderPipe, TranslateModule],
  styleUrls: ['./start.page.scss']
})
export class StartPage {

  public questions: Array<Question>;

  public showedQuestion?: Question;

  public themeSelected: string = '';

  public indexShowedQuestion: number = 0;

  public userAnswer: string;

  public correctAnswer: boolean;
  public showSolution: boolean;

  public showResume: boolean;
  public numberOfQuestions: number = 2;
  public hits: number = 0;



  constructor(public _utilitiesService: UtilitiesService,
    public _userService: UserService,
    public _questionService: QuestionService) { }

  getQuestions(theme: string) {
    this.themeSelected = theme;
    this._utilitiesService.loading = true;
    const options = {
      params: new HttpParams()
        .append('theme', theme)
        .append('number', this.numberOfQuestions)
    };
    this._questionService.getQuestions(options).subscribe(
      (data: any) => {
        console.log('data', data);
        this.questions = data.result;
        this._utilitiesService.alertError = '';
        this._utilitiesService.loading = false;
        this.showedQuestion = this.questions[this.indexShowedQuestion];
      },
      (err: any) => {
        console.log('err', err)
        this._utilitiesService.alertError = "Error al obtener las preguntas";
        this._utilitiesService.loading = false;
      }
    );
  }

  public check() {
    var result = this.showedQuestion?.answers.find(answer => {
      return answer.answer == this.userAnswer;
    })
    this.showSolution = true;
    if (result?.isCorret) {
      this.correctAnswer = true;
      this.hits++
    } else {
      this.correctAnswer = false;
    }
  }

  public nextQuestion() {
    this.showSolution = false;
    this.indexShowedQuestion++;
    this.showedQuestion = this.questions[this.indexShowedQuestion];
  }

  public finish() {
    this.showResume = true;
    this.showSolution = false;
  }

  public retry() {
    this.showResume = false;
    this.themeSelected = '';
    delete this.showedQuestion;
    this.indexShowedQuestion = 0;
  }

  public setNumberOfQuestions(number: number) {
    this.numberOfQuestions = number;
  }

}
