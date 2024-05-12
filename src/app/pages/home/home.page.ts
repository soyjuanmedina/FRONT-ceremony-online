import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule, RouterOutlet } from '@angular/router';
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

  confirmMailMessageSuccess: string;
  confirmMailMessageDanger: string;
  uuid: string;

  constructor (private activatedRoute: ActivatedRoute, public _userService: UserService, public _utilitiesService: UtilitiesService, public router: Router) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['uuid']) {
        this.uuid=params['uuid']
        this.confirmMail(this.uuid);
      }
    });
  }

  confirmMail(uuid: string) {
    let params={
      uuid: uuid
    }
    this._userService.confirmEmail(params).subscribe(data => {
      this.confirmMailMessageSuccess='Gracias por confirmar tu mail. Ahora ya puedes loguearte en Culturaxya';
      this._utilitiesService.loading=false;
    },
      err => {
        this.confirmMailMessageDanger='No existe el usuario'
        this._utilitiesService.loading=false;
      });
  }


  ngOnInit(): void {
  }

}
