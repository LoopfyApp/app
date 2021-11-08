import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-loja-complete',
  templateUrl: './perfil-loja-complete.page.html',
  styleUrls: ['./perfil-loja-complete.page.scss'],
})
export class PerfilLojaCompletePage implements OnInit {
@Input() loja;
user;
  constructor(
    public modal: ModalController,
    public auth: AuthService
  ){}

  async ngOnInit(){
    console.log(this.loja);
    this.user = await this.auth.getUserData();
  }

  closeModal()
  {
    this.modal.dismiss();
  }

}