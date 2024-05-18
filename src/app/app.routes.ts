import { Routes } from '@angular/router';
import { RegisterPage } from './pages/register/register.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { StartPage } from './pages/start/start.page';
import { ConfirmEmailPage } from './pages/confirm-email/confirm-email.page';
import { AdminPage } from './pages/admin/admin.page';
import { ProposeQuestionPage } from './pages/propose-question/propose-question.page';

export const routes: Routes = [
  { path: '', title: "Culturaxya", component: HomePage },
  { path: 'admin', component: AdminPage },
  { path: 'propose', component: ProposeQuestionPage },
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  { path: 'start', component: StartPage },
  { path: 'confirm-email/:id', component: ConfirmEmailPage }
];
