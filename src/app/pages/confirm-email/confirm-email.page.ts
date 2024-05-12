import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'confirm-email-page',
  templateUrl: './confirm-email.page.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ConfirmEmailPage implements OnInit {

  confirmMailMessageSuccess: string;
  confirmMailMessageDanger: string;

  constructor (public _userService: UserService,
    public route: ActivatedRoute, public _utilitiesService: UtilitiesService) {
    this.confirmMail();
  }

  confirmMail() {
    let uuid;
    this.route.params.subscribe(params => {
      uuid=params['id'];
    });
    let params={
      uuid: uuid
    }
    this._userService.confirmEmail(params).subscribe(data => {
      this.confirmMailMessageSuccess='Gracias por confirmar tu mail. Ahora ya puedes loguearte en Culturaxya';
      this._utilitiesService.loading=false;
      window.scrollTo(0, 0);
    },
      err => {
        this.confirmMailMessageDanger='No existe el usuario'
        this._utilitiesService.loading=false;
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

    });
  }

}
