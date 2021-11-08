import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { ModalController, Platform } from '@ionic/angular';
import { PhotoprofileComponent } from 'src/app/components/photoprofile/photoprofile.component';
import { LoginApp, UserRegister } from 'src/app/models/users.models';
import { AuthService } from 'src/app/services/auth.service';

import { UtilsService } from 'src/app/services/utils.service';
import { ServerService } from '../../../services/server.service';


@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.page.html',
  styleUrls: ['./userregister.page.scss'],
})
export class UserregisterPage implements OnInit {
  viewPassword: boolean = false;

  imageDefault = '/assets/button/boton_foto.svg';
  RegisterForm: FormGroup;
  UserRegister: UserRegister;
  typeOption = 'password';
  uuid:any
  validation_messages = {
    email: [
      { type: 'required', message: 'Informe um e-mail.' },
      { type: 'email', message: 'Por favor, informe um e-mail válido' },
    ],

    nome: [{ type: 'required', message: 'Informe um nome.' }],
    password: [
      { type: 'required', message: 'Informe uma senha' },
      {
        type: 'minlength',
        message: 'A Senha precisa ter 6 caracteres no mínimo.',
      },
      {
        type: 'maxlength',
        message: 'A Senha precisa ter 10 caracteres no maximo.',
      },
    ],
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private util: UtilsService,
    private modal: ModalController,
    public server:ServerService

  ) {
    this.uuidDispositivo()
    this.RegisterForm = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        politicas: [true, Validators.requiredTrue],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.matchingPasswords('password', 'confirmPassword') }
    );
  }

  ionViewWillEnter() {
    this.RegisterForm.reset();
  }

  ngOnInit() {}

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true,
        };
      }
    };
  }

  saveInfo() {
    this.util.showLoading('Carregando...');
    this.authService
      .signup(this.UserRegister)
      .then(async (response: LoginApp) => {
        this.util.dismissLoading();
        this.authService.setAuth(
          response.user,
          response.access_token,
          response.token_type
        );
 
        this.router.navigate(['/register/validations']);
      })
      .catch((e) => {
        this.util.dismissLoading();
        this.util.showToast('O email ja esta cadastrado');
      });
  }

  ValueInfo(value) {
    let usuarioDono = {
      name: value.nome,
      email: value.email,
      password: value.password,
      type: 1,
      photo: this.imageDefault,
      plataforma:"Ninguna",
      token:this.uuid
    };
    this.UserRegister = usuarioDono;
  }

  async goToCamera() {
    const modal = await this.modal.create({
      component: PhotoprofileComponent,
      mode: 'ios',
    });

    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
      if (dataReturned.data.data !== null) {
        this.imageDefault = dataReturned.data.data;
      } else {
        this.imageDefault = '/assets/button/boton_foto.svg';
      }
    });

    return await modal.present();
  }

  passwordview(valor) {
    this.viewPassword = valor;
    if (this.viewPassword) {
      this.typeOption = 'text';
    } else {
      this.typeOption = 'password';
    }
  }


  async uuidDispositivo(){
    const info = await Device.getId();
    console.log(info);
    this.uuid=info.uuid
  }
  
  aleertConfirm() {
    this.util
      .showAlertConfirmAction(
        'Mensagem',
        'Você tem certeza de que todos os dados estão corretos.'
      )
      .then((data) => {
        if (data) {
          this.saveInfo();
        }
      });
  }



}
