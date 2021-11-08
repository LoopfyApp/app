/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BuyProductPage } from '../../modal/buy-product/buy-product.page';
import { ServerService } from '../../../services/server.service';

@Component({
  selector: 'app-products-card',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss'],
})
export class ProductcardComponent implements OnInit {

  @Input() productos;
  @Output() EmiteDetails= new EventEmitter<number>();
  @Input() typeUsers;
   
  constructor(
    public modalController: ModalController,
    public server:ServerService
  ) { }

  ngOnInit() {}


  modalDetails(x){
    this.EmiteDetails.emit(x);
  }

  async buyProduct(produto)
  {
    const modal = await this.modalController.create({
      component: BuyProductPage,
      cssClass: 'my-custom-class',
      componentProps: {produto: produto}
    });
    return await modal.present();

  }

}
