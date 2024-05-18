import { Component } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionService } from '../../services/question.service';

@Component( {
  selector: 'app-propose-question',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './propose-question.page.html'
} )
export class ProposeQuestionPage {

  proposeQuestionForm = new FormGroup( {
    theme: new FormControl( '', {
      nonNullable: true,
      validators: [Validators.required],
    } ),
    level: new FormControl( '1', {
      nonNullable: true,
      validators: [Validators.required],
    } ),
    question: new FormControl( '', {
      nonNullable: true,
      validators: [Validators.required],
    } ),
    correctAnswer: new FormControl( '', {
      nonNullable: true,
      validators: [Validators.required],
    } ),
    otherAnswer1: new FormControl( '', {
      nonNullable: true,
      validators: [Validators.required],
    } ),
    otherAnswer2: new FormControl( '', {
      nonNullable: true,
      validators: [Validators.required],
    } ),
    otherAnswer3: new FormControl( '', {
      nonNullable: true,
      validators: [Validators.required],
    } ),
    explanation: new FormControl( '', {
      nonNullable: true,
      validators: [Validators.required],
    } )
  } );

  constructor ( public _utilitiesService: UtilitiesService, public questionService: QuestionService ) {
    this._utilitiesService.clearAlerts();
  }

  propose () {
    this._utilitiesService.loading = true;
    this._utilitiesService.clearAlerts();
    this.questionService.propose( this.proposeQuestionForm.getRawValue() ).subscribe(
      data => {
        this._utilitiesService.alertSuccess = "Gracias por tu colaboración. Nuestro equipo de expertos revisará tu pregunta y la publicará muy pronto";
        this.proposeQuestionForm.reset();
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "No se ha podido enviar la pregunta, por favor, inténtalo más tarde";
        this._utilitiesService.loading = false;
      }
    );
  }

}
