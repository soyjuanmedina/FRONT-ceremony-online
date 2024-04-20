import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';
import { CommonModule } from '@angular/common';
declare let $: any;

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  imports: [CommonModule, RouterModule],
  standalone: true,
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {


  constructor(public _userService: UserService, public _utilitiesService: UtilitiesService, public router: Router) {
  }


  ngOnInit(): void {
  }

}
