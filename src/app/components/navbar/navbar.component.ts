import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  imports: [RouterModule, CommonModule],
  standalone: true,
})
export class NavbarComponent implements OnInit {

  showed: boolean = false;

  constructor(private authService: AuthService, public _userService: UserService) { }

  logout() {
    this.authService.logout();
  }

  openRegisterModal() {

  }
  openLoginModal() {

  }

  ngOnInit(): void {
  }

}
