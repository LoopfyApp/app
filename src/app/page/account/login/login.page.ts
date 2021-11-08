import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginApp } from 'src/app/models/users.models';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ServerService } from '../../../services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  viewPassword: false;
  typeOption = 'password';
  validations_form: FormGroup;
  errorMessage: string = '';
  validation_messages = {
    email: [
      { type: 'required', message: 'Informe um e-mail.' },
      { type: 'pattern', message: 'Por favor, informe um e-mail válido' },
    ],
    password: [
      { type: 'required', message: 'Informe uma senha' },
      {
        type: 'minLength',
        message: 'A Senha precisa ter 6 caracteres no mínimo.',
      },
    ],
  };
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private util: UtilsService,
    public server:ServerService
  ) {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });
  }

  ngOnInit() {}

  passwordview(valor) {
    this.viewPassword = valor;
    if (this.viewPassword) {
      this.typeOption = 'text';
    } else {
      this.typeOption = 'password';
    }
  }

  async loginUser(value) {
    this.util.showLoading('Carregando...');
    this.authService
      .login(value)
      .then(async (response: LoginApp) => {
        this.util.dismissLoading();
        this.authService.setAuth(
          response.user,
          response.access_token,
          response.token_type
        );
   
        if (response.user.verification == 0) {
          this.router.navigate(['/home/red']);
        } else {
          this.router.navigate(['/register/validations']);
        }
      })
      .catch((e) => {
        this.util.dismissLoading();
        this.util.showToast('Verifique suas credenciais');
      });
  }

  ionViewWillEnter(){
    this.validations_form.reset()
  }
  register(){
    this.router.navigate(['register'], {
      replaceUrl: true,
    });
  }
  reset(){
    this.router.navigate(['reset'], {
      replaceUrl: true,
    });
  }
}
