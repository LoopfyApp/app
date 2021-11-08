import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../services/server.service';
import { AlertController, ModalController } from '@ionic/angular';
import { SharedmascotePage } from 'src/app/components/sharedmascote/sharedmascote.page';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  user: any
  mascote:any
  password:any=""
  constructor(
    private server:ServerService,
    private modal:ModalController,
    public alertController: AlertController,
    public utils: UtilsService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.infoUser()
    this.getmascote()
  }

async  getmascote(){
    this.server.getUserMascotes().then( (data:any)=>{
      this.mascote=data.data
    }).catch(()=>{
       
    })

  }

  infoUser(){

    this.server.getUser().then( (data:any)=>{
      this.user=data
      console.log(data)
    })
  }
  onScroll(event) {
    // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
    if (event.detail.deltaY > 0 && this.flagHeaderSticky) return;
    if (event.detail.deltaY < 0 && !this.flagHeaderSticky) return;
    if (event.detail.scrollTop != 0) {
      // console.log("scrolling");
      this.flagHeaderSticky = true;
      this.flagFilterSticky = true;
    } else if (event.detail.scrollTop == 0) {
      // console.log("scroll TOP");
      this.flagHeaderSticky = false;
      this.flagFilterSticky = false;
    }
  }

  async newPets() {
    const modal = await this.modal.create({
      component: SharedmascotePage,
      cssClass: 'newMascoteModalClass',
      componentProps: {modaloptions: true}
    });

    modal.onDidDismiss().then((data: any) => {
      this.getmascote();
    });
    return await modal.present();
  }


    async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'alert-custom',
      header: 'Mudança de senha',
      subHeader:'A senha deve conter 1 caractere maiúsculo, 1 caractere minúsculo, 1 caractere numérico e 1 caractere especial',
      inputs: [
        {
          name: 'password',
          type: 'password',
          value:this.password,
          placeholder: 'Digite a senha',
          cssClass: 'specialClass',
          attributes: {
            minLength:4,
            inputmode: 'text'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Mudar',
          handler: (data: any) => {
            this.password=data.password
            let validate=this.validatePasswords(this.password)
  
            if(validate){
         
              this.passwordresset();
            }
            else{
         
              this.presentAlertPrompt()
              this.utils.showToast("A senha inserida não atende aos parâmetros","top")
            }
           
          }
        }
      ]
    });

    await alert.present();
  }

  passwordresset(){
    this.utils.showLoading("Aguarde...");
    this.server.passwordReset({'password':this.password})
    .then( (data:any)=>{
      this.utils.dismissLoading()
      this.utils.showToast("Senha alterada com sucesso","top")
    }).catch(()=>{
      this.utils.dismissLoading()
      this.utils.showToast("Erro ao alterar a senha tente mais tarde","top")
    })
  }


  validatePasswords(PasswordParameter){
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    if(strongPassword.test(PasswordParameter)) {
      return true;
    }
    else{
      return false;
    }
  }

}
