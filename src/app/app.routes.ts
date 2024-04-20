import { Routes } from '@angular/router';
import { RegisterPage } from './pages/register/register.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';

export const routes: Routes = [
  { path: '', title: "Home", component: HomePage },
  { path: 'register', title: "Registro", component: RegisterPage },
  { path: 'login', title: "Login", component: LoginPage },
];
