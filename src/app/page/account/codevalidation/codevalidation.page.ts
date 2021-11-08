import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ServerService } from '../../../services/server.service';

@Component({
  selector: 'app-codevalidation',
  templateUrl: './codevalidation.page.html',
  styleUrls: ['./codevalidation.page.scss'],
})
export class CodevalidationPage implements OnInit {
  lengthOTP: number = 6;
  codeOTP: string;
  validOTP: boolean = false;
  isLoading: boolean = false;
  userD: any;
  typeUser: number;
  constructor(
    public server: AuthService,
    public servers: ServerService,
    private util: UtilsService,
    public route: Router,
    private router: NavController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.codeOTP = '';
   await this.server.getUserData()
   await this.server.getToken()
  }

  onCodeChanged(actualCode: string) {
    if (actualCode.length !==this.lengthOTP) this.validOTP = false;
  }

  onCodeCompleted(code?: string) {
    this.codeOTP = code;
    if (this.codeOTP.length === this.lengthOTP) {
      this.validOTP = true;
    }
  }

  async validateForm() {
    await this.util.showLoading('Carregando...');

    this.servers.verifyCode(this.codeOTP).then(
      (response: any) => {
        this.util.dismissLoading();
        if (response.error === true) {
          this.util.showToast(response.message);
        } else {
          this.util.showToast(response.message);
          this.util.setStorage('user', JSON.stringify(response.user));
          if (response.user.type !== 1) {
            this.route.navigate(
              ['/home/red/loja/perfil-loja/' + response.user.id],
              {
                replaceUrl: true,
              }
            );
          } else {
            this.route.navigate(['/register/pets'], {
              replaceUrl: true,
            });
          }
        }
      },
      (error) => {
        this.util.dismissLoading();
        console.log(error);

        this.util.showToast(
          error.error && error.error.message
            ? error.error.message
            : 'Ocorreu um erro desconhecido, tente novamente'
        );
      }
    );
  }

  async resendCode() {
    await this.util.showLoading('Carregando...');
    this.server.resendCode().then(
      (response) => {
        this.util.dismissLoading();
        this.util.showToast('Novo código enviado');
      },
      (error) => {
        this.util.dismissLoading();
        console.log(error);

        this.util.showToast(
          error.error && error.error.message
            ? error.error.message
            : 'Ocorreu um erro desconhecido, tente novamente'
        );
      }
    );
  }

  async cancelar() {
    await this.util.showLoading('Carregando...');
    this.server.CancelUser().then(
      (response) => {
        this.util.dismissLoading();
        this.util.removeStorage('user');
        this.util.removeStorage('token');
        this.router.navigateRoot(['/login']);
      },
      (error) => {
        this.util.dismissLoading();
        console.log(error);

        this.util.showToast(
          error.error && error.error.message
            ? error.error.message
            : 'Ocorreu um erro desconhecido, tente novamente'
        );
      }
    );
  }
}
