/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { SharedmascotePage } from '../components/sharedmascote/sharedmascote.page';
import { AuthService } from '../services/auth.service';
import { ServerService } from '../services/server.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  childrens: any;
  pages: any;
  name: any;
  cart: boolean= false;
  productscartid: any;
  photo: any='/assets/button/no-camaras.png';
  type=0
  id_user=0
  urlprofile=""
  constructor(
    private authService: AuthService,
    private server: ServerService,
    private navController: NavController,
    private menuCtrl: MenuController,
    public utils: UtilsService,
    public modal: ModalController
  ) {

  this.type=this.authService.userD.type
  this.id_user=this.authService.userD.id
 this.urlprofile="/home/red/loja/perfil-loja/"+this.authService.userD.id
  }

  async menu() {
    await this.utils.colorstatusbar('#FFFFFF');
    this.name=this.authService.userD.name;
    this.photo=this.authService.userD.photo;
    console.log('user', this.authService.userD);
    this.childrens = [];

   await this.server.getUserMascotes().then((data: any) => {
      this.utils.setStorage('animales',data.data.length);
      for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        var objs = {
          title: data.data[index].name,
          url: '/home/red/pets/profile/' + data.data[index].id,
          icon: 'paw-outline',
        };
        this.childrens.push(objs);
      }
      var newpet = {
        title: 'Adicionar Pet',
        url: false,
        icon: 'paw-outline',
        action: 'newPets',
      };
      this.childrens.push(newpet);
    });

    if (this.authService.userD.type === 1) {
      this.pages = [
        {
          title: 'Meus pets',
          icon: '/assets/icon/mismascotas.svg',
          children: this.childrens,
        },
        {
          title: 'Minhas compras',
          url: '/home/compras',
          icon: '/assets/icon/mispedidos.svg',
        },
        {
          title: 'Meus agendamentos',
          url: '/home/listagenda',
          icon: '/assets/icon/mis citas.svg',
        },
       
        {
          title: 'Notificações',
          url: '/home/notifications',
          icon: '/assets/icon/notif.svg',
        },
        {
          title: 'Configurações',
          url: '/configurations',
          icon: '/assets/icon/config.svg',
        },
      ];
    }
    if (this.authService.userD.type >= 2) {
      this.pages = [
        // {
        //   title: 'Meu perfil',
        //   url: '/menu/sixth/tabs6/meu-perfil',
        //   icon: '/assets/icon/mis-feets.svg',
        // },
        // {
        //   title: 'Meus pets',
        //   icon: '/assets/icon/mismascotas.svg',
        //   children: this.childrens,
        // },
        {
          title: 'Minha loja',
          url: '/home/red/loja/perfil-loja/'+this.authService.userD.id,
          icon: '/assets/icon/mitienda.svg',
        },
        {
          title: 'Minhas vendas',
          url: '/home/compras',
          icon: '/assets/icon/misventas.svg',
        },

        {
          title: 'Meus agendamentos',
          url: '/home/listagenda',
          icon: '/assets/icon/mis citas.svg',
        },
 
    
        {
          title: 'Notificações',
          url: '/home/notifications',
          icon: '/assets/icon/notif.svg',
        },
        {
          title: 'Configurações',
          url: '/configurations',
          icon: '/assets/icon/config.svg',
        },
      ];
    }
  }

  gotoRoute(sub)
  {
    if(sub.url){
      this.navController.navigateRoot([sub.url]);
    } else {
      this.newPets();
    }
    this.menuCtrl.close('home-menu');
  }

async logout(){
   await this.authService.logOut();
  }

  async ionViewWillEnter(){
     await this.menu();
    setInterval(() =>  this.cartadd(), 3000);
  }
  async cartadd(){
    this.cart = await this.utils.getStorage('add_cart');
    console.log(this.cart);
    if(!this.cart || this.cart ===null) {
      this.productscartid=await this.utils.getStorage('CART_PRODUCTS_ID');

        if(this.productscartid !== null){
            this.cart = true;
            console.log('CART_PRODUCTS_ID', this.productscartid);
        }
        else{this.cart = false;}
    }
  }

  cartCheckout(){
    this.navController.navigateBack('home/checkoutcart');
  }

  async newPets() {
    const modal = await this.modal.create({
      component: SharedmascotePage,
      cssClass: 'newMascoteModalClass',
      componentProps: {modaloptions: true}
    });

    modal.onDidDismiss().then((data: any) => {
    this.menu();
    });
    return await modal.present();
  }
}
