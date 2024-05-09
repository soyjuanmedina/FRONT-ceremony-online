import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from '../../services/utilities.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'register-page',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class RegisterPage implements OnInit {

  newUser: User;

  newUserForm = new FormGroup({
    username: new FormControl('', [
      Validators.required]),
    email: new FormControl('', [
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required])
  });

  constructor(public _authService: AuthService, public _userService: UserService,
    public _utilitiesService: UtilitiesService) {
    this._utilitiesService.clearAlerts();
  }

  register() {
    this._utilitiesService.clearAlerts();
    this._utilitiesService.loading = true;
    this._authService.register(this.newUserForm.value as User).subscribe(
      data => {
        this._utilitiesService.alertSuccess = "Gracias por registrate en Culturaxya. Ya puedes acceder con tu cuenta"
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = err.error.message || "Se ha producido un error al procesar el registro. Prueba a hacerlo en unos minutos"
        this._utilitiesService.loading = false;
      }
    );
  }

  ngOnInit(): void {
  }

}
