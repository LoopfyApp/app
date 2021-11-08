/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ServerService } from '../../../services/server.service';


@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.scss'],
})
export class ProductinfoComponent implements OnInit {
  info: any;
  loading: boolean =false;
  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      reverseDirection: false,
    },
  };

  typeUser: number
  constructor(
    private server: ServerService,
    public navParams: NavParams,
    public modal: ModalController
    ) {}

  ngOnInit() {
    this.getid();
  }
  async ionViewWillEnter(){
 
    this.typeUser=await this.server.typeUsers();
 
  }
  close(){
    this.modal.dismiss({data: null});
  }

  async getid() {
    this.server
      .getProductAllId(this.navParams.get('products'))
      .then((datos: any) => {
        console.log(datos);
        this.info=datos.data;
        this.loading=true;
      });
  }

  async buyProduct(produto)
  {
    this.modal.dismiss({data: produto, goto: 'buy'});
  }
  
}
