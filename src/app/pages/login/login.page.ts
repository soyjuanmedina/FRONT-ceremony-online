import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';
import { CommonModule } from '@angular/common';

@Component( {
  selector: 'login-page',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
} )
export class LoginPage implements OnInit {

  user: User;
  showResendActivationEmailButton: boolean = false;

  loginForm = new FormGroup( {
    username: new FormControl( '', [
      Validators.required] ),
    password: new FormControl( '', [
      Validators.required] )
  } );

  constructor ( public _authService: AuthService, public _userService: UserService,
    public _utilitiesService: UtilitiesService, public router: Router ) {
    this._utilitiesService.clearAlerts();
  }

  login () {
    this._utilitiesService.clearAlerts();
    this._utilitiesService.loading = true;
    this._authService.login( this.loginForm.value ).subscribe(
      data => {
        let response = data as any;
        this._userService.saveToken( response.data.accessToken );
        this._userService.saveUser( response.data.user );
        this._utilitiesService.loading = false;
        this.router.navigate( ['/start'], { skipLocationChange: true } );
      },
      err => {
        if ( err.status == 412 ) {
          this._utilitiesService.alertError = "Usuario inactivo, por favor confirme su dirección de mail antes de loguearse";
          this.showResendActivationEmailButton = true;
        } else {
          this._utilitiesService.alertError = "Error de autenticación";
        }
        this._utilitiesService.loading = false;
      }
    );
  }

  resendActivationEmail () {
    this._utilitiesService.clearAlerts();
    this.showResendActivationEmailButton = false;
    this._utilitiesService.loading = true;
    console.log( 'resendActivationEmail', this.loginForm );
    this._authService.resendActivationEmail( this.loginForm.value ).subscribe(
      data => {
        this._utilitiesService.alertSuccess = "Se ha enviado de nuevo el mail de activación, por favor revisa tu correo para confirmarlo";
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "No se ha podido enviar el correo";
        this._utilitiesService.loading = false;
      }
    );
  }

  ngOnInit (): void {
  }

}
