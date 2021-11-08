import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginApp } from 'src/app/models/users.models';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  viewPassword: false;
  typeOption = 'password';
  validations_form: FormGroup;
  errorMessage: string = '';
  validation_messages = {
    email: [
      { type: 'required', message: 'Informe um e-mail.' },
      { type: 'pattern', message: 'Por favor, informe um e-mail válido' },
    ],
  
  };
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private util: UtilsService
  ) {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
    });
  }

  ngOnInit() {}

 

  async loginUser(value) {
    this.util.showLoading('Carregando...');
    this.authService.reset(value).then((response: any) => {
      this.util.dismissLoading();
      this.validations_form.reset()
      this.util.showToast(response.message);
      if(response.error===false){
      this.router.navigate(['login'], {
        replaceUrl: true,
      });}
    })      
    .catch((e) => {
      this.util.dismissLoading();
      this.util.showToast('Entre com um email válido');
    });
 
 
  }

  register(){
    this.router.navigate(['login'], {
      replaceUrl: true,
    });
  }
}
