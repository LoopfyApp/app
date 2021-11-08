import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Device } from '@capacitor/device';
import { ModalController } from '@ionic/angular';
import { PhotoprofileComponent } from 'src/app/components/photoprofile/photoprofile.component';
import { LoginApp } from 'src/app/models/users.models';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';
import { UtilsService } from 'src/app/services/utils.service'; 
@Component({
  selector: 'app-usercomerce',
  templateUrl: './usercomerce.page.html',
  styleUrls: ['./usercomerce.page.scss'],
})
export class UsercomercePage implements OnInit {
  viewPassword:boolean=false
  typeOption = 'password'
  validations_form: FormGroup;
  verificar_form:FormGroup;
  photo:any="/assets/button/boton_foto.svg";
  tipo;
  usuario={}
  isLoadding: boolean = false;

  opciondata="1";
  validation_messages = {
    'email': [
      { type: 'required', message: 'Informe um e-mail.' },
      { type: 'email', message: 'Por favor, informe um e-mail válido' }
    ],
    
    'name': [
      { type: 'required', message: 'Informe um nome.' }, 
    ],
    'razon': [
      { type: 'required', message: 'Informe um razon.' }, 
    ],
    'cnpj': [
      { type: 'required', message: 'Informe um CNPJ.' }, 
    ],
    'cep': [
      { type: 'required', message: 'Informe um CEP.' }, 
    ],
    'phone': [
      { type: 'required', message: 'Informe um Telefone.' }, 
    ],
    'password': [
      { type: 'required', message: 'Informe uma senha' },
      { type: 'minlength', message: 'A Senha precisa ter 6 caracteres no mínimo.' },
      { type: 'maxlength', message: 'A Senha precisa ter 10 caracteres no maximo.' }
    ]
  };
  uuid:any
  constructor( private formBuilder: FormBuilder,
    public router: Router,
    private modal:ModalController,
    private route: ActivatedRoute,
    public utils:UtilsService,
    public auth :AuthService,
    public server:ServerService,  ) {
      this.verificar_form = formBuilder.group({
        cnpj: ['',Validators.compose([Validators.required,Validators.minLength(3)])],
        birthday:['']
      });
      this.validations_form = formBuilder.group({
        name: ['',Validators.required],
        razon: ['',Validators.required],
        cnpj: ['',Validators.compose([Validators.required,Validators.minLength(3)])],
        cep: ['',Validators.compose([Validators.required,Validators.minLength(3)]) ],
        phone: ['',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(11)])],
        address: ['',Validators.required],
        politicas: [true,Validators.requiredTrue],
        complemento: [''],
        token: [''],
        plataforma: ['ninguna'],
        photo: [this.photo], 
        type: [this.route.snapshot.paramMap.get('id')],
        opciondata: [this.opciondata],
        email: ['',Validators.compose([Validators.required,Validators.email])],
        password: ['',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(11)])],
        confirmPassword: ['', Validators.required],}
        , {validator: this.matchingPasswords('password', 'confirmPassword')}); 

        this.tipo=this.route.snapshot.paramMap.get('id');
     }

     ionViewWillEnter(){
       this.uuidDispositivo()
      this.validations_form.reset()
      this.validations_form.controls['type'].setValue(this.route.snapshot.paramMap.get('id'));
      console.log(this.route.snapshot.paramMap.get('id'))
    }

  ngOnInit() {

    
  }
  async uuidDispositivo(){
    const info = await Device.getId(); 
    this.uuid=info.uuid
    this.validations_form.controls['token'].setValue(info.uuid);
  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  
  tryRegisterNoFire(value) {
    this.usuario = value;  
    console.log(value)
  }


  async presentAlertConfirm() {
    this.utils.showAlertConfirmAction('Política de privacidade','','Ao clicar em prosseguir você confirma que concorda com a nossa <strong>política de privacidade<strong>',["Cancelar","Prosseguir"]).then(data=>{
      if(!data){
          this.addRegister();
      }
    })
  }


  addRegister(){
    this.tryRegisterNoFire(this.validations_form.value)   
    this.utils.showLoading('Carregando...');
    this.auth.signup(this.usuario).then(async (response: LoginApp) => {
     this.utils.dismissLoading()
      this.auth.setAuth(response.user, response.access_token, response.token_type);


 
      this.router.navigate(['/register/validations']);

       
   }).catch(e => {
     this.utils.dismissLoading()
       this.utils.showToast('O email ja esta cadastrado');
     });
  }
  
  async  goToCamera(){
	  const modal = await this.modal.create({
      component: PhotoprofileComponent,
      mode:'ios'
    });

    modal.onDidDismiss().then((dataReturned) => {
       
      if (dataReturned.data.data !== null) {
 
        this.photo=dataReturned.data.data
      }
      else{
        this.photo='/assets/button/boton_foto.svg';
      }
    });

    return await modal.present();
    
  };


  
  async validarCnpj(cnpj:any){
    console.log(cnpj.length)
    if(cnpj.length > 6){
      if(this.opciondata=='1'){
        await this.utils.showLoading('Carregando...');
        this.validatecpnj(cnpj)
      }
    else{
      this.validatecpf(cnpj,this.verificar_form.get('birthday').value)
    }
  }
  }
  validatecpf(cnpj,data){
    let info={
      'cpf':cnpj,
      'data':data
    }
    this.server.Getcpf(info).then((response: any) => {
        console.log(response.data.result.nome_da_pf)
        if(response.error==true){
          this.utils.showToast(response.message);
          this.verificar_form.controls['cnpj'].setValue('');
          this.verificar_form.controls['birthday'].setValue('');
        }
        else{
          //name
          this.validations_form.controls['opciondata'].setValue(this.opciondata);
          this.validations_form.controls['cnpj'].setValue(this.verificar_form.get('cnpj').value);
          this.validations_form.controls['name'].setValue(response.data.result.nome_da_pf);
          this.validations_form.controls['razon'].setValue(response.data.result.nome_da_pf);
          this.verificar_form.controls['cnpj'].setValue('');
          this.isLoadding=true
        }
        
    }, (error) => {
        this.utils.dismissLoading();
        this.utils.showToast(
          error.error && error.error.message
            ? error.error.message
            : 'Ocorreu um erro desconhecido, tente novamente'
        );
      })
  }

  validatecpnj(cnpj){
    this.server.GetCnpj(cnpj).then((response: any) => {
        
      this.utils.dismissLoading();
      if(response.error==true){
        this.utils.showToast(response.message);
        this.verificar_form.controls['cnpj'].setValue('');
      }
      else{
        console.log(response.data.situacao)
        if(response.data.situacao=="ATIVA"){
          if(response.data.cep != ''){
            var cep=response.data.cep
            cep=cep.replace(".", "");
            cep=cep.replace("-", "");
            this.validations_form.controls['cep'].setValue(cep);
            this.validarCep(cep);
          }
          this.validations_form.controls['opciondata'].setValue(this.opciondata);

            this.validations_form.controls['cnpj'].setValue(this.verificar_form.get('cnpj').value);
            this.validations_form.controls['razon'].setValue(response.data.fantasia);
            this.validations_form.controls['complemento'].setValue(response.data.complemento);
            this.verificar_form.controls['cnpj'].setValue('');
            this.isLoadding=true
          }
          else{
            this.utils.showToast("Seu código CNPJ não está ativo");  
          }
        }
     
      //  this.isLoadding=true
       // this.validations_form.controls['cnpj'].setValue('');
     
     
    }, (error) => {
      this.utils.dismissLoading();
      this.utils.showToast(
        error.error && error.error.message
          ? error.error.message
          : 'Ocorreu um erro desconhecido, tente novamente'
      );
    })
  }

  async validarCep(cep:string){
    console.log(cep.length)
    if(cep.length > 4){
        await this.utils.showLoading('Carregando...');
        this.server.GetCep(cep).then((response: any) => {
        
          this.utils.dismissLoading();
          if(response.error==true){
            this.utils.showToast(response.message);
            this.validations_form.controls['cep'].setValue('');
          }
          else{
            this.validations_form.controls['address'].setValue(response.data.combinado);
       
          }
         
        }, (error) => {
          this.utils.dismissLoading();
          this.utils.showToast(
            error.error && error.error.message
              ? error.error.message
              : 'Ocorreu um erro desconhecido, tente novamente'
          );
        })
    }

  }
  
  passwordview(valor) {
    this.viewPassword = valor;
    if (this.viewPassword) {
      this.typeOption = 'text';
    } else {
      this.typeOption = 'password';
    }
  }

 

}
