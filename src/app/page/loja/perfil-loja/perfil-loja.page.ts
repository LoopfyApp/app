import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { BuyProductPage } from 'src/app/components/modal/buy-product/buy-product.page';
import { NewpostsComponent } from 'src/app/components/newposts/newposts.component';
import { ProductinfoComponent } from 'src/app/components/products/productinfo/productinfo.component';

import { ServerService } from 'src/app/services/server.service';

import { PerfilLojaCompletePage } from '../perfil-loja-complete/perfil-loja-complete.page';

@Component({
  selector: 'app-perfil-loja',
  templateUrl: './perfil-loja.page.html',
  styleUrls: ['./perfil-loja.page.scss'],
})
export class PerfilLojaPage implements OnInit {
  @ViewChild(IonContent, { static: false, read: IonContent })
  content: IonContent;
  info;
  posts;
  flagHeaderSticky: boolean = false;
  flagFilterSticky: boolean = false;
  isLoadding: boolean = false;
  redeOption=2;
  LojaOption=1;
  constructor(  public route: ActivatedRoute,
    public server:ServerService,
    public modal:ModalController) {
     
   }

  ngOnInit() {
    this.GetProfileLojas();
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

  GetProfileLojas(){
    console.log('GET PROFILE');
    let obj = {
      store: this.route.snapshot.paramMap.get('id')
    };
    this.server.GetLojaProfile(obj).then( (info:any)=>{
      console.log(info);
      this.isLoadding=true;
      this.info = info.data;
      
    }).catch( (error)=>{
      
      this.isLoadding=true;
    });
  }
   
  LojasValue(ev: any) {
    this.LojaOption=ev.detail.value
    
  }

  redesValue(ev: any) {
    this.redeOption=ev.detail.value
    
  }


 async postNew(){
    const modal = await this.modal.create({
      component: NewpostsComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

async dataProfileLoja(lojas: any){
  const modal = await this.modal.create({
    component: PerfilLojaCompletePage,
     componentProps: {loja: lojas},
    cssClass: 'my-custom-class'
  });
  modal.onDidDismiss().then((dataReturned) => {
    console.log(dataReturned.data);
    if(dataReturned.data)
    {
      console.log('DATA RETURNED');
      this.GetProfileLojas();
    }
  });  
  return await modal.present();
}


async openModal(x){
  const modal = await this.modal.create({
    component: ProductinfoComponent,
    cssClass: 'class-products',
    componentProps:{products: x}
  });
  modal.onDidDismiss()
    .then((data) => {
      this.buyProduct(data.data.data);
    });
  return await modal.present();
}

async buyProduct(produtos: any)
  {
    const modal = await this.modal.create({
      component: BuyProductPage,
      cssClass: 'my-custom-class',
      componentProps: {produto: produtos}
    });
    return await modal.present();

  }
}